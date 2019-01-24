import * as React from 'react';
import { bind } from 'decko';
import { Dispatch, bindActionCreators } from 'redux';

import {
  Resource, CleanedListProviderPropsByResource, DataByResource, IListRequest, IListProviderProps, ISortParams,
  IPaginationParams, IListProviderChildrenProps, AvailabilitySortByResource, AvailabilityPaginationByResource,
  SortOrder,
} from 'shared/types/models';
import { ICommunication } from 'shared/types/redux';
import { multiConnect } from 'shared/helpers/redux';

import { IReduxState } from '../../../namespace';
import * as actions from '../../../redux/actions';
import { initial } from '../../../redux/initial';
import * as selectors from '../../../redux/selectors';

interface IStateProps {
  loading: ICommunication;
  items: Array<DataByResource[Resource]>;
  total: number;
  request: IListRequest<Resource> | null;
}

interface IActionProps {
  loadList: typeof actions.loadList;
}

type IProps = IListProviderProps & IStateProps & IActionProps;

interface IState {
  sort: ISortParams<string> | null;
  pagination: IPaginationParams | null;
  filter: null;
}

function mapState(state: IReduxState): IStateProps {
  const data = selectors.selectListData(state);
  return {
    loading: selectors.selectListLoading(state),
    items: data.items,
    total: data.total,
    request: data.request,
  };
}

function mapDispatch(dispatch: Dispatch): IActionProps {
  return bindActionCreators({
    loadList: actions.loadList,
  }, dispatch);
}

const sortAvailability: AvailabilitySortByResource = {
  incoming: true,
};
const paginationAvailability: AvailabilityPaginationByResource = {
  incoming: true,
};
// const filterAvailability: AvailabilityFilterByResource = {
//   contributors: false,
//   fund: false,
//   transaction: false,
//   userFund: false,
// };

const defaultPerPage = 10;

class MultiListProvider extends React.PureComponent<IProps, IState> {
  public state: IState = {
    sort: this.props.sort ? this.props.sort as ISortParams<string> : null,
    pagination: paginationAvailability[this.props.resource] ? {
      perPage: this.props.perPage || defaultPerPage,
      current: 1,
    } : null,
    filter: null,
  };

  public componentDidMount() {
    this.loadList();
  }

  public componentDidUpdate(prevProps: IProps, prevState: IState) {
    const prevRequest = this.getRequest(prevProps, prevState);
    const currentRequest = this.getRequest();

    const fields: Array<keyof IListRequest<Resource>> = ['filter', 'pagination', 'resource', 'sort'];

    if (fields.some(field => prevRequest[field] !== currentRequest[field])) {
      this.loadList();
    }

  }

  public render() {
    return this.props.children(this.getChildrenProps());
  }

  @bind
  private loadList() {
    this.props.loadList(this.getRequest());
  }

  @bind
  private getRequest(props?: IProps, state?: IState): IListRequest<Resource> {
    const { resource } = props || this.props;
    const { sort, pagination, filter } = state || this.state;
    return {
      filter,
      resource,
      sort: sort as IListRequest<Resource>['sort'] || undefined,
      pagination: pagination || undefined,
    };
  }

  @bind
  private getChildrenProps(): IListProviderChildrenProps {
    const { resource, items, loading, total } = this.props;
    const { pagination, sort, filter } = this.state;
    return {
      items,
      loading: loading.isRequesting,
      error: loading.error,
      filter: filter ? filter : undefined,
      pagination: !pagination ? undefined : {
        perPage: pagination.perPage,
        total,
        currentPage: pagination.current,
        pageCount: this.calcPageCount(),
        loadMore: this.loadMore,
        toPage: this.toPage,
        toNext: this.toNext,
      },
      sort: sortAvailability[resource] ? {
        params: sort as NonNullable<IListProviderChildrenProps['sort']>['params'],
        setSort: this.setSort,
      } : undefined,
    };
  }

  @bind
  private loadMore() {
    const { perPage, total } = this.props;
    this.setState(state => {
      const currentPerPage = state.pagination && state.pagination.perPage || defaultPerPage;
      const nextPerPage = currentPerPage + (perPage || defaultPerPage);
      return currentPerPage >= total ? null : {
        pagination: {
          current: 1,
          perPage: nextPerPage,
        },
      };
    });
  }

  @bind
  private toNext() {
    this.setState(state => {
      const pageCount = this.calcPageCount(state);
      const currentPage = state.pagination && state.pagination.current || 1;
      return currentPage === pageCount ? null : {
        pagination: {
          current: Math.min(currentPage + 1, pageCount),
          perPage: this.props.perPage || defaultPerPage,
        },
      };
    });
  }

  @bind
  private toPage(page: number) {
    this.setState(state => {
      const pageCount = this.calcPageCount(state);
      const currentPage = state.pagination && state.pagination.current || 1;
      const nextPage = Math.min(page, pageCount);
      return currentPage === nextPage ? null : {
        pagination: {
          current: nextPage,
          perPage: this.props.perPage || defaultPerPage,
        },
      };
    });
  }

  @bind
  private setSort(field: string, order?: SortOrder) {
    this.setState(state => {
      const orderInvertor: Record<SortOrder, SortOrder> = { asc: 'desc', desc: 'asc' };
      const nextOrder = order || (
        state.sort && state.sort.field === field ? orderInvertor[state.sort.order] : 'asc'
      );

      const isEqualSort = state.sort && state.sort.field === field && state.sort.order === nextOrder;
      return isEqualSort ? null : {
        sort: {
          field,
          order: nextOrder,
        },
      };
    });
  }

  @bind
  private calcPageCount(state?: IState) {
    const { total } = this.props;
    const { pagination } = state || this.state;
    return Math.ceil(total / (pagination && pagination.perPage || defaultPerPage));
  }
}

const MultiProvider = (
  multiConnect(['dataProvider'], initial, mapState, mapDispatch)(
    MultiListProvider, { removeInstanceOnLastUnmount: false },
  )
);

// tslint:disable-next-line:max-classes-per-file
class ResultListProvider<T extends Resource> extends React.Component<CleanedListProviderPropsByResource<T>> {
  public render() {
    return (
      <MultiProvider
        {...this.props as CleanedListProviderPropsByResource<Resource>}
        instanceKey={this.props.resource}
      />
    );
  }
}

export default ResultListProvider;

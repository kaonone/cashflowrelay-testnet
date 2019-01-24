declare module 'drizzle-react' {
  import * as React from 'react';
  import { Drizzle, DrizzleState } from 'drizzle'

  export interface InjectDrizzleProps {
    drizzle: Drizzle;
    drizzleState: DrizzleState; // at the first render is null, you need to wrap your app in LoadingContainer, which will block the render of children if state is null
    initialized: boolean;
  }

  export const DrizzleContext: {
    Context: React.Context<InjectDrizzleProps>;
    Consumer: React.Context<InjectDrizzleProps>['Consumer'];
    Provider: React.ComponentClass<{ drizzle: Drizzle }>;
  }
}
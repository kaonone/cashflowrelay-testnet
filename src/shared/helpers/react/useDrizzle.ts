import { useContext } from 'react';
import { DrizzleContext, InjectDrizzleProps } from 'drizzle-react';
import getEnvParams from 'core/getEnvParams';

export default function useDrizzle(): InjectDrizzleProps {
  // TODO ds: replace on DrizzleContext.Context after drizzle-react updating
  return useContext(getEnvParams().isDevelopment
    ? (DrizzleContext.Consumer as any)._context
    : DrizzleContext.Consumer as any,
  );
}

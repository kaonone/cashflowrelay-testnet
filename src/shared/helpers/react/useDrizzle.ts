import { useContext } from 'react';
import { DrizzleContext, InjectDrizzleProps } from 'drizzle-react';

export default function useDrizzle(): InjectDrizzleProps {
  // TODO ds: replace on DrizzleContext.Context after drizzle-react updating
  return useContext(DrizzleContext.Consumer as any);
}

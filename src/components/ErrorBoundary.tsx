import type { ReactNode } from 'react';

interface Props {
  section: string;
  children?: ReactNode;
}

export default function ErrorBoundary({ children }: Props) {
  return <>{children}</>;
}

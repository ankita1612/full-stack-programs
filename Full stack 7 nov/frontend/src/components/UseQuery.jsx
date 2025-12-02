import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TodoList from "./TodoList.jsx";

const queryClient = new QueryClient();

export default function UseQuery() {
  return (
    <QueryClientProvider client={queryClient}>
       <TodoList /> 
    </QueryClientProvider>
  );
}
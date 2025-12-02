import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function TodoList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000 // optional: cache unused data for 30 minutes
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading todos</div>;

  return (
    <ul>
      {data.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

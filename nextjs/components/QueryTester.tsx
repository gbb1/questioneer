import { fetchTest, queryClient } from "../query/index";
import { useQuery, useMutation } from "@tanstack/react-query";

const QueryTester = () => {
  const { data, isError, isPending, isLoading, refetch } = useQuery({
    queryFn: ({ signal }) => fetchTest({ signal }),
    queryKey: ["test"],
  });

  //   const mutationObj = useMutation({
  //     mutationFn: deleteEvent,
  //     onSuccess: () => {
  //       navigate('/events');
  //       queryClient.invalidateQueries({ queryKey: ['events'] });
  //     },
  //   })

  return (
    <div>
      <div>
        <span>Loading:</span>
        <div>{isPending}</div>
      </div>

      <div>
        <span>Response data:</span>
        <div>{data ?? "..."}</div>
      </div>

      <div>
        <span>Error status:</span>
        <div>{isError ?? "..."}</div>
      </div>
    </div>
  );
};

export default QueryTester;

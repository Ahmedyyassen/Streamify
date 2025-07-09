import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutFn } from "../lib/api";

const useLogOut = () => {
  const queryClient = useQueryClient();
  const {mutate, isPending, error} = useMutation({
    mutationFn: logoutFn,
    onSuccess: ()=>{
        queryClient.invalidateQueries({queryKey:["authUser"]})
    }
  })
  return { logoutMutaion:mutate, isPending, error };
}

export default useLogOut
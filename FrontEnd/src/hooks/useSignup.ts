import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signupFn } from "../lib/api";

const useSignup = () => {
    const queryClient  = useQueryClient();
  
    const { mutate ,isPending, error} = useMutation({
      mutationFn: signupFn,
      onSuccess:()=> queryClient.invalidateQueries({queryKey: ["authUser"]})
    });
    return { signupMutaion:mutate, isPending, error };
}

export default useSignup
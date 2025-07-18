import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { acceptFriendReqFn, getFriendsRequestsFn } from "../lib/api"
import type { GETFRIENTREQUEST } from "../interface/user";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
import NotNotificationsFound from "../components/NotNotificationsFound";

const NotificationsPage = () => {  
  const quesryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery<GETFRIENTREQUEST>({
    queryKey: ["friendRequests"],
    queryFn: getFriendsRequestsFn,
  });
  
  const {mutate:acceptRequestMutation,isPending} = useMutation({
    mutationFn: acceptFriendReqFn,
    onSuccess: () => {
      quesryClient.invalidateQueries({ queryKey: ["friendRequests"]})
      quesryClient.invalidateQueries({ queryKey: ["friends"]})
      quesryClient.invalidateQueries({ queryKey: ["requestsCount"]})
    } 
  })
  const incomingRequests = friendRequests?.inComingReqs;
  const acceptedRequests = friendRequests?.acceptedReqs;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl font-bold sm:text-3xl tracking-tight mb-6">
          Notifications
        </h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <>
          {Number(incomingRequests?.length) > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <UserCheckIcon className="h-5 w-5 text-primary" />
                Friend Requests
                <span className="badge badge-primary ml-2">
                  {incomingRequests?.length}
                </span>
              </h2>

              <div className="space-y-3">
                {incomingRequests?.map((req) => (
                  <div
                    key={req._id}
                    className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="card-body p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="avatar w-14 h-14 rounded-full bg-base-200">
                            <img
                              src={req.sender?.profilePic}
                              alt={req.sender.fullName}
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold">
                              {req.sender.fullName}
                            </h3>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              <span className="badge badge-secondary badge-sm">
                                Native: {req.sender?.nativeLanguage}
                              </span>
                              <span className="badge badge-outline badge-sm">
                                Learning: {req.sender?.nativeLanguage}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => acceptRequestMutation(req._id)}
                          disabled={isPending}
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Accepted Requests */}
          {Number(acceptedRequests?.length) > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <BellIcon className="w-5 h-5 text-success" />
                New Connections
              </h2>

              <div className="space-y-3">
                {acceptedRequests?.map((notifi) => (
                  <div key={notifi._id} className="card bg-base-200 shadow-md">
                    <div className="card-body p-4">
                      <div className="flex items-start gap-3">
                        <div className="avatar mt-1 size-10 rounded-full bg-base-200">
                          <img
                            src={notifi.recipient.profilePic}
                            alt={notifi.recipient.fullName}
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold">
                            {notifi.recipient.fullName}
                          </h3>
                          <p className="text-sm my-1">
                            {notifi.recipient.fullName} accepted your friend
                            request
                          </p>
                          <p className="text-xs flex items-center opacity-70">
                            <ClockIcon className="h-3 w-3 mr-1" />
                            Recently
                          </p>
                        </div>

                        <div className="badge badge-success">
                          <MessageSquareIcon className="h-3 w-3 mr-1" />
                          New Friend
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {Number(incomingRequests?.length) === 0 && Number(acceptedRequests?.length) === 0 && (
            <NotNotificationsFound />
          )}
        </>
      )}
    </div>
  );
}

export default NotificationsPage
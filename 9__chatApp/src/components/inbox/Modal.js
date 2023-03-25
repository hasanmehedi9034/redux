import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { conversationsApi, useAddConversationMutation, useEditConversationMutation } from "../../features/conversations/converationsApi";
import { useGetUserQuery } from "../../features/users/usersApi";
import { isValidEmail } from "../../utils/isValidEmail";
import Error from "../ui/Error";

export default function Modal({ open, control }) {
    const [to, setTo] = useState('');
    const [message, setMessage] = useState('');
    const [userCheck, setUserCheck] = useState(false);
    const { user: loggedInUser } = useSelector(state => state.auth) || {}
    const { email: loggedInEmail } = loggedInUser;
    const dispatch = useDispatch();
    const [responseError, setResopnseError] = useState('')
    const [conversation, setConversation] = useState(undefined);

    const { data: participant } = useGetUserQuery(to, {
        skip: !userCheck
    });
    const [addConversation, {isSuccess: isAddConversation}] = useAddConversationMutation()
    const [editconversation, {isSuccess: isEditConversation}] = useEditConversationMutation()

    const doSearch = (value) => {
        if (isValidEmail(value)) {
            setTo(value);
            setUserCheck(true);
        }
    }

    const debounceHandler = (fn, delay) => {
        let timeoutId;

        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn(...args)
            }, delay)
        }
    }

    const handleSearch = debounceHandler(doSearch, 500);

    useEffect(() => {
        if (participant?.length > 0 && participant[0].email !== loggedInEmail) {
            //  check conversation existance
            dispatch(conversationsApi.endpoints.getconversation.initiate({
                userEmail: loggedInEmail,
                participantEmail: to
            }))
                .unwrap()
                .then(data => {
                    setConversation(data);
                })
                .catch(err => {
                    setResopnseError('There was a problem')
                })
        }
    }, [participant, loggedInEmail, dispatch, to])

    // listen conversation added
    useEffect(() => {
        if(isAddConversation || isEditConversation) {
            control();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAddConversation, isEditConversation])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(conversation?.length > 0) {
            // edit conversation
            editconversation({
                id:  conversation[0].id,
                sender: loggedInEmail,
                data: {
                    participants: `${loggedInEmail}-${participant[0].email}`,
                    users: [loggedInUser, participant[0]],
                    message,
                    timestamp: new Date().getTime()
                }
            })
        }
        else if (conversation?.length === 0) {
            // add conversation
            addConversation({
                sender: loggedInEmail,
                data: {
                    participants: `${loggedInEmail}-${participant[0].email}`,
                    users: [loggedInUser, participant[0]],
                    message,
                    timestamp: new Date().getTime()
                }
            });
        }
    }

    return (
        open && (
            <>
                <div
                    onClick={control}
                    className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
                ></div>
                <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Send message
                    </h2>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="to" className="sr-only">
                                    To
                                </label>
                                <input
                                    onChange={e => handleSearch(e.target.value)}
                                    id="to"
                                    name="to"
                                    type="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Send to"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">
                                    Message
                                </label>
                                <textarea
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    id="message"
                                    name="message"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Message"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                disabled={conversation === undefined || (participant?.length > 0 && participant[0].email === loggedInEmail)}
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            >
                                Send Message
                            </button>
                        </div>

                        {participant?.length === 0 && <Error message='User Not  Found' />}
                        {participant?.length > 0 && participant[0].email === loggedInEmail && <Error message='You can not send message to yourself' />}
                        {responseError !== '' && <Error message={responseError} />}
                    </form>
                </div>
            </>
        )
    );
}

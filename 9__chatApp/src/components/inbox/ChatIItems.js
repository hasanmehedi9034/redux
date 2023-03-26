import moment from "moment/moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetConversationsQuery } from "../../features/conversations/converationsApi";
import { getPartnerInfo } from "../../utils/getPartnerInfo";
import Error from "../ui/Error";
import ChatItem from "./ChatItem";
const gravatar = require("gravatar");

export default function ChatItems() {
    const { user } = useSelector(state => state.auth) || {};

    const { email } = user || {};
    const { data: conversations, isLoading, isError, error } = useGetConversationsQuery(email)

    // decide what to render
    let content = null;
    if (isLoading) content = <li>Loading...</li>
    else if (!isLoading && isError) content = <Error message={error.data} />
    else if (!isLoading && !isError && conversations?.length === 0) content = <li>No converstaion found</li>
    else if (!isLoading && !isError && conversations?.length > 0) {
        content = conversations?.map(conversation => {
            const { message, timestamp, id } = conversation;
            const { name, email: partnerEmail } = getPartnerInfo(conversation.users, email)

            return (
                <li key={id}>
                    <Link to={`/inbox/${id}`}>
                        <ChatItem
                            avatar={gravatar.url(partnerEmail)}
                            name={name}
                            lastMessage={message}
                            lastTime={moment(timestamp).fromNow()}
                        />
                    </Link>
                </li>
            )
        })
    }

    return (
        <ul>
            {content}
        </ul>
    );
}

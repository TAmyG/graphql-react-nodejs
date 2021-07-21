import React from 'react';
import { useChatMessages } from './hook';

// import { addMessage, getMessages, onMessageAdded } from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({ user }) => {
    const { messages, addMessage } = useChatMessages();

    const handleSend = async (text) => {
        await addMessage(text);
    };

    return (
        <section className="section">
            <div className="container">
                <h1 className="title">Chatting as {user}</h1>
                <MessageList user={user} messages={messages} />
                <MessageInput onSend={handleSend} />
            </div>
        </section>
    );
};

export default Chat;

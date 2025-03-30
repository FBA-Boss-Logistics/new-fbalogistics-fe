export const isSameSenderMargin = (messages, m, i, userId) => {
    if (
        i < messages.length - 1 &&
        messages[i + 1].sender._id === m.sender._id &&
        messages[i].sender._id !== userId
    )
        return 33;
    else if (
        (i < messages.length - 1 &&
            messages[i + 1].sender._id !== m.sender._id &&
            messages[i].sender._id !== userId) ||
        (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
        return 0;
    else return "auto";
};

export const isSameSender = (messages, m, i, currentUserRole) => {
    return (
        i < messages.length - 1 &&
        messages[i + 1].sender_type !== m.sender_type &&
        messages[i].sender_type !== currentUserRole
    );
};

export const isLastMessage = (messages, i, currentUserRole) => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender_type !== currentUserRole
    );
};

export const isSameSenderAsNext = (messages, i) => {
    return (
        i < messages.length - 1 &&
        messages[i].sender_type === messages[i + 1].sender_type
    );
};

export const shouldShowProfilePhoto = (messages, i, currentUserRole) => {
    return (
        messages[i].sender_type !== currentUserRole && 
        (
            i === 0 || 
            messages[i].sender_type !== messages[i - 1].sender_type
        ) 
    );
};


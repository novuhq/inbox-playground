import { notionInviteNotification } from './notion-usecases/Invite/workflow';
import { notionMentionNotification } from './notion-usecases/Mention/workflow';
import { notionSuggestionNotification } from './notion-usecases/Suggestion/workflow';
import { notionCommentNotification } from './notion-usecases/Comment/workflow';
import { redditReplyToComment } from './reddit-usecases/reply-to-comment/workflow';
import { redditReplyToPost } from './reddit-usecases/reply-to-post/workflow';
import { redditUpvote } from './reddit-usecases/upvote/workflow';
import { defaultNotification } from './default-usecase/Default/workflow';


export const workflows = [
    notionInviteNotification,
    notionMentionNotification,
    notionSuggestionNotification,
    notionCommentNotification,
    redditReplyToPost,
    redditUpvote,
    redditReplyToComment,
    defaultNotification
]


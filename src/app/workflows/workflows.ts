import { notionInviteNotification } from './notion-usecases/Invite/workflow';
import { notionMentionNotification } from './notion-usecases/Mention/workflow';
import { notionSuggestionNotification } from './notion-usecases/Suggestion/workflow';
import { notionCommentNotification } from './notion-usecases/Comment/workflow';

export const workflows = [
    notionInviteNotification,
    notionMentionNotification,
    notionSuggestionNotification,
    notionCommentNotification
]


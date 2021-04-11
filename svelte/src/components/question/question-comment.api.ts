import { operationStore } from '@urql/svelte';

export const fetchCommentsGql = `
      query ($questionId : BigInt!, $userId : BigInt!) {
        questionComments(condition: {questionId: $questionId}) {
          nodes {
            id
            parentId
            comment
            upvotes
            downvotes
            author {
              id
              firstName
              lastName
            }
            isUserUpvoted : questionCommentUpvotesByCommentId(condition: {userId: $userId}) {
              totalCount
            }
            isUserDownvoted : questionCommentDownvotesByCommentId(condition: {userId: $userId}) {
              totalCount
            }                        
            createdDate
          }
        }
      }
    `;

export const commentAdd = operationStore(`
  mutation ($questionId: BigInt!, $parentId: BigInt, $comment: JSON!) {
    questionCommentAdd(input: {questionId: $questionId, parentId:$parentId, comment:$comment }) {
      clientMutationId
      questionComment {
        id
      }
    }
  }`);

export const commentUpdate = operationStore(`
  mutation ($commentId: BigInt!, $comment: JSON!) {
    questionCommentUpdate(input: {commentId : $commentId, comment: $comment }) {
      questionComment {
        id
        comment
      }
      clientMutationId
    }
  }`);

export const commentDelete = operationStore(`
  mutation ($commentId: BigInt!) {
    questionCommentDelete(input: {commentId : $commentId }) {
      clientMutationId
    }
  }`);

export const commentUpvoteAdd = operationStore(`
    mutation ($commentId : BigInt!) {
        questionCommentUpvoteAdd(input: {commentId: $commentId}) {
          clientMutationId
        }
      }
  `);

export const commentUpvoteCancel = operationStore(`
  mutation ($commentId : BigInt!) {
      questionCommentUpvoteCancel(input: {commentId: $commentId}) {
        clientMutationId
      }
    }`);

export const commentDownvoteAdd = operationStore(`
  mutation ($commentId : BigInt!) {
      questionCommentDownvoteAdd(input: {commentId: $commentId}) {
        clientMutationId
      }
    }`);

export const commentDownvoteCancel = operationStore(`
  mutation ($commentId : BigInt!) {
      questionCommentDownvoteCancel(input: {commentId: $commentId}) {
        clientMutationId
      }
    }`);

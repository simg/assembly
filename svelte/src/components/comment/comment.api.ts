import { operationStore } from "@urql/svelte";

export const commentAdd = operationStore(`
  mutation ($treeId: BigInt!, $parentId: BigInt, $comment: JSON!) {
    commentAdd(input: {treeId: $treeId, parentId:$parentId, comment:$comment }) {
      clientMutationId
      comment {
        id
      }
    }
  }`);

export const commentAddGql = `
  mutation ($treeId: BigInt!, $parentId: BigInt, $comment: JSON!) {
    commentAdd(input: {treeId: $treeId, parentId:$parentId, comment:$comment }) {
      clientMutationId
      comment {
        id
      }
    }
  }`;  

export const commentUpdate = operationStore(`
  mutation ($commentId: BigInt!, $comment: JSON!) {
    commentUpdate(input: {commentId : $commentId, comment: $comment }) {
      comment {
        id
        comment
      }
      clientMutationId
    }
  }`);

export const commentDelete = operationStore(`
  mutation ($commentId: BigInt!) {
    commentDelete(input: {commentId : $commentId }) {
      clientMutationId
    }
  }`);

export const commentUpvoteAdd = operationStore(`
  mutation ($commentId : BigInt!) {
      commentUpvoteAdd(input: {commentId: $commentId}) {
        clientMutationId
      }
    }
`);

export const commentUpvoteCancel = operationStore(`
  mutation ($commentId : BigInt!) {
    commentUpvoteCancel(input: {commentId: $commentId}) {
      clientMutationId
    }
  }`);

export const commentDownvoteAdd = operationStore(`
  mutation ($commentId : BigInt!) {
    commentDownvoteAdd(input: {commentId: $commentId}) {
      clientMutationId
    }
  }`);

export const commentDownvoteCancel = operationStore(`
  mutation ($commentId : BigInt!) {
    commentDownvoteCancel(input: {commentId: $commentId}) {
      clientMutationId
    }
  }`);

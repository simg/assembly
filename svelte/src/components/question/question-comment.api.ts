import { operationStore } from '@urql/svelte';

export const fetchCommentsGql = `
      query ($questionId: BigInt!, $userId: BigInt!) {
        comments(condition: {treeId: $questionId}) {
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
              isUserUpvoted: commentUpvotes(condition: {userId: $userId}) {
                totalCount
              }
              isUserDownvoted: commentDownvotes(condition: {userId: $userId}) {
                totalCount
              }
              createdDate
            }
          }
      }
    `;

  // export const fetchCommentsGql = `
  //   query ($questionId: BigInt!, $userId: BigInt!) {
  //     question(id: $questionId) {
  //       commentTreeByCommentTree {
  //         commentsByTreeId {
  //           nodes {
  //             id
  //             parentId
  //             comment
  //             upvotes
  //             downvotes
  //             author {
  //               id
  //               firstName
  //               lastName
  //             }                
  //             isUserUpvoted: commentUpvotes(condition: {userId: $userId}) {
  //               totalCount
  //             }
  //             isUserDownvoted: commentDownvotes(condition: {userId: $userId}) {
  //               totalCount
  //             }
  //             createdDate
  //           }
  //         }
  //       }
  //     }
  //   }
  // `;    

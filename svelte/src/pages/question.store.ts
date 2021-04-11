import { operationStore, query, mutation } from '@urql/svelte';

export const fetchQuestions = (params) => {

 return query(operationStore(`
    query ($questionId : BigInt!, $userId : BigInt!) {
      question(id: $questionId) {
        __typename
        id
        question
        createdDate
        questionFollowers {
          totalCount
        }
        questionComments {
          totalCount
        }          
        isUserFollowing : questionFollowers(condition: {userId: $userId}) {
          totalCount
        }          
        answers {
          totalCount
          nodes {
            __typename
            id
            answer
            author {
              __typename
              id
              firstName
              lastName
            }
            createdDate
            commentCount
          }
        }
      }
    }
  `, params, { requestPolicy: 'network-only' }));  
}


// export const followQuestionMutation = mutation(operationStore(`
// mutation ($questionId : BigInt!) {
//     questionFollow(input: {questionId: $questionId}) {
//       clientMutationId
//     }
//   }
// `));
import type { Author } from './types';
import type { OutputBlockData } from "@editorjs/editorjs";

import * as _ from 'lodash/fp';

type _GqlComment = {
  id : string ;
  parentId : string
  comment : OutputBlockData[];
  upvotes: number ;
  downvotes:number;
  isUserUpvoted: {
    totalCount:number
  };
  isUserDownvoted:{
    totalCount:number
  };
  author: Author ;
  createdDate: Date;
}

export type CommentTree = {
  index: Map<string, Comment> ;
  comments: Comment[] ;
  orphans:Comment[] ;
}

export type Comment = {
  id : string | undefined;
  parentId : string ;
  comment: OutputBlockData[] ;
  upvotes: number ;
  downvotes:number;
  isUserUpvoted:boolean;
  isUserDownvoted:boolean; 
  author: Author;
  createdDate:Date;
  replies: Comment[];
  expanded: boolean;
  showEdit:boolean;
}




export const emptyCommentTree = () => ({
  index : new Map<string, Comment>(),
  comments:[],
  orphans:[],
});

export const removeCommentFromTree = (commentTree:CommentTree, comment:Comment) : CommentTree => {
  if (!comment.parentId) {
    commentTree.comments = commentTree.comments.filter(c => c != comment);
    return commentTree;
  }
  const parentComment = commentTree.index[comment.parentId];
  if (!parentComment) {
    // we don't have the comment in the tree. maybe something has gone wrong?
    return commentTree;
  }
  parentComment.comments = parentComment.comments.filter(c => c != comment);
  return commentTree;
}

export const updateCommentTree = (commentTree:CommentTree, comments: Comment | Comment[] ) : CommentTree => {
  return Array.isArray(comments) ? comments.reduce(_updateCommentTree, commentTree)
                                 : _updateCommentTree(commentTree, comments);
}

const _updateCommentTree = (commentTree:CommentTree, comment: Comment) : CommentTree => {

  // if this comment id already exists update the existing comment in the tree and return
  if (commentTree.index.get(comment.id)) {
    //comment = mergeComment(comment, _comment);
    commentTree.index.set(comment.id, comment);
    return commentTree;
  } 

  // this is a new comment
  // comment = toComment(_comment);
  commentTree.index.set(comment.id, comment);
  
  //check the orphans list
  const orphans = commentTree.orphans.filter(c => c.parentId === comment.id);
  comment.replies = orphans;
  commentTree.orphans = _.difference(commentTree.orphans, orphans);

  if (comment.parentId) {
    // this is a comment reply
    const parentComment = commentTree.index.get(comment.parentId);
    if (parentComment) {
      // add reply to parent
      //TODO: sort comments array in some specific order
      parentComment.replies.push(comment);
    } else {
      // we don't haven't seen the parent for this comment yet
      commentTree.orphans.push(comment);
    }
  } else {
    //this is a top level comment
    //TODO: sort comments array in some specific order
    commentTree.comments.push(comment);
    comment.expanded = true; // always show the first comment
  }
  return commentTree;
}


// const mergeComment = (comment: Comment, _comment: Comment) : Comment => {
//   return _.assign(
//       comment, 
//       _comment, {
//         isUserUpvoted: !!_comment.isUserUpvoted.totalCount,
//         isUserDownvoted: !!_comment.isUserDownvoted.totalCount,
//       }
//     );
// }

export function toComment(_comment: _GqlComment) : Comment {
  return _.assign(_comment, {
      replies:[],
      expanded:false,
      showAddReply:false,
      isUserUpvoted: !!_comment.isUserUpvoted.totalCount,
      isUserDownvoted: !!_comment.isUserDownvoted.totalCount,
    });
}
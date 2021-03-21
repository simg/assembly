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
  orphans:Comment[];
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
  orphans:[]
});

export const updateCommentTree = (commentTree:CommentTree, comments: _GqlComment[] ) : CommentTree => {
  return comments.reduce(_updateCommentTree, commentTree);
}

const _updateCommentTree = (commentTree:CommentTree, _comment: _GqlComment) : CommentTree => {

  // either update the existing comment from the tree
  let comment = commentTree.index.get(_comment.id);
  if (comment) {
    comment = mergeComment(comment, _comment);
  } else {
    comment = toComment(_comment);
    commentTree.index.set(comment.id, comment);
    
    //check the orphans list
    const orphans = commentTree.orphans.filter(c => c.parentId === comment.id);
    comment.replies = orphans;
    commentTree.orphans = _.difference(commentTree.orphans, orphans);
  }

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


const mergeComment = (comment: Comment, _comment: _GqlComment) : Comment => {
  return _.assign(
      comment, 
      _comment, {
        isUserUpvoted: !!_comment.isUserUpvoted.totalCount,
        isUserDownvoted: !!_comment.isUserDownvoted.totalCount,
      }
    );
}

function toComment(_comment: _GqlComment) : Comment {
  return _.assign(_comment, {
      replies:[],
      expanded:false,
      showAddReply:false,
      isUserUpvoted: !!_comment.isUserUpvoted.totalCount,
      isUserDownvoted: !!_comment.isUserDownvoted.totalCount,
    });
}
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /**
   * A signed eight-byte integer. The upper big integer values are greater than the
   * max value for a JavaScript number. Therefore all big integers will be output as
   * strings and not numbers.
   */
  BigInt: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
};

/** The root query type which gives access points into the data universe. */
export type GqlQuery = GqlNode & {
  __typename?: 'Query';
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: GqlQuery;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<GqlNode>;
  /** Reads and enables pagination through a set of `Answer`. */
  answers?: Maybe<GqlAnswersConnection>;
  /** Reads and enables pagination through a set of `AnswerComment`. */
  answerComments?: Maybe<GqlAnswerCommentsConnection>;
  /** Reads and enables pagination through a set of `Question`. */
  questions?: Maybe<GqlQuestionsConnection>;
  /** Reads and enables pagination through a set of `QuestionComment`. */
  questionComments?: Maybe<GqlQuestionCommentsConnection>;
  /** Reads and enables pagination through a set of `QuestionFollower`. */
  questionFollowers?: Maybe<GqlQuestionFollowersConnection>;
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<GqlUsersConnection>;
  answer?: Maybe<GqlAnswer>;
  answerComment?: Maybe<GqlAnswerComment>;
  question?: Maybe<GqlQuestion>;
  questionComment?: Maybe<GqlQuestionComment>;
  questionFollower?: Maybe<GqlQuestionFollower>;
  user?: Maybe<GqlUser>;
  currentUserId?: Maybe<Scalars['Int']>;
  /** Reads a single `Answer` using its globally unique `ID`. */
  answerByNodeId?: Maybe<GqlAnswer>;
  /** Reads a single `AnswerComment` using its globally unique `ID`. */
  answerCommentByNodeId?: Maybe<GqlAnswerComment>;
  /** Reads a single `Question` using its globally unique `ID`. */
  questionByNodeId?: Maybe<GqlQuestion>;
  /** Reads a single `QuestionComment` using its globally unique `ID`. */
  questionCommentByNodeId?: Maybe<GqlQuestionComment>;
  /** Reads a single `QuestionFollower` using its globally unique `ID`. */
  questionFollowerByNodeId?: Maybe<GqlQuestionFollower>;
  /** Reads a single `User` using its globally unique `ID`. */
  userByNodeId?: Maybe<GqlUser>;
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryAnswersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GqlAnswersOrderBy>>;
  condition?: Maybe<GqlAnswerCondition>;
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryAnswerCommentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GqlAnswerCommentsOrderBy>>;
  condition?: Maybe<GqlAnswerCommentCondition>;
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GqlQuestionsOrderBy>>;
  condition?: Maybe<GqlQuestionCondition>;
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryQuestionCommentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GqlQuestionCommentsOrderBy>>;
  condition?: Maybe<GqlQuestionCommentCondition>;
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryQuestionFollowersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GqlQuestionFollowersOrderBy>>;
  condition?: Maybe<GqlQuestionFollowerCondition>;
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GqlUsersOrderBy>>;
  condition?: Maybe<GqlUserCondition>;
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryAnswerArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryAnswerCommentArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryQuestionCommentArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryQuestionFollowerArgs = {
  userId: Scalars['BigInt'];
  questionId: Scalars['BigInt'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryUserArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryAnswerByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryAnswerCommentByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryQuestionCommentByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryQuestionFollowerByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type GqlQueryUserByNodeIdArgs = {
  nodeId: Scalars['ID'];
};

/** An object with a globally unique `ID`. */
export type GqlNode = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};


/** Methods to use when ordering `Answer`. */
export enum GqlAnswersOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  AnswerAsc = 'ANSWER_ASC',
  AnswerDesc = 'ANSWER_DESC',
  QuestionIdAsc = 'QUESTION_ID_ASC',
  QuestionIdDesc = 'QUESTION_ID_DESC',
  AuthorIdAsc = 'AUTHOR_ID_ASC',
  AuthorIdDesc = 'AUTHOR_ID_DESC',
  UpdatedDateAsc = 'UPDATED_DATE_ASC',
  UpdatedDateDesc = 'UPDATED_DATE_DESC',
  CreatedDateAsc = 'CREATED_DATE_ASC',
  CreatedDateDesc = 'CREATED_DATE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A condition to be used against `Answer` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type GqlAnswerCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `answer` field. */
  answer?: Maybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `questionId` field. */
  questionId?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `authorId` field. */
  authorId?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `updatedDate` field. */
  updatedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
};




/** A connection to a list of `Answer` values. */
export type GqlAnswersConnection = {
  __typename?: 'AnswersConnection';
  /** A list of `Answer` objects. */
  nodes: Array<Maybe<GqlAnswer>>;
  /** A list of edges which contains the `Answer` and cursor to aid in pagination. */
  edges: Array<GqlAnswersEdge>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Answer` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** Answer */
export type GqlAnswer = GqlNode & {
  __typename?: 'Answer';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  answer: Scalars['JSON'];
  questionId: Scalars['BigInt'];
  authorId: Scalars['BigInt'];
  updatedDate?: Maybe<Scalars['Datetime']>;
  createdDate?: Maybe<Scalars['Datetime']>;
  /** Reads a single `Question` that is related to this `Answer`. */
  question?: Maybe<GqlQuestion>;
  /** Reads a single `User` that is related to this `Answer`. */
  author?: Maybe<GqlUser>;
  /** Reads and enables pagination through a set of `AnswerComment`. */
  answerComments: GqlAnswerCommentsConnection;
};


/** Answer */
export type GqlAnswerAnswerCommentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GqlAnswerCommentsOrderBy>>;
  condition?: Maybe<GqlAnswerCommentCondition>;
};

/** Question Followers */
export type GqlQuestion = GqlNode & {
  __typename?: 'Question';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  authorId: Scalars['BigInt'];
  question: Scalars['String'];
  details?: Maybe<Scalars['String']>;
  updatedDate?: Maybe<Scalars['Datetime']>;
  createdDate?: Maybe<Scalars['Datetime']>;
  /** Reads a single `User` that is related to this `Question`. */
  author?: Maybe<GqlUser>;
  /** Reads and enables pagination through a set of `QuestionFollower`. */
  questionFollowers: GqlQuestionFollowersConnection;
  /** Reads and enables pagination through a set of `Answer`. */
  answers: GqlAnswersConnection;
  /** Reads and enables pagination through a set of `QuestionComment`. */
  questionComments: GqlQuestionCommentsConnection;
};


/** Question Followers */
export type GqlQuestionQuestionFollowersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GqlQuestionFollowersOrderBy>>;
  condition?: Maybe<GqlQuestionFollowerCondition>;
};


/** Question Followers */
export type GqlQuestionAnswersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GqlAnswersOrderBy>>;
  condition?: Maybe<GqlAnswerCondition>;
};


/** Question Followers */
export type GqlQuestionQuestionCommentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GqlQuestionCommentsOrderBy>>;
  condition?: Maybe<GqlQuestionCommentCondition>;
};

export type GqlUser = GqlNode & {
  __typename?: 'User';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  email: Scalars['String'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  updatedDate?: Maybe<Scalars['Datetime']>;
  createdDate?: Maybe<Scalars['Datetime']>;
  /** Reads and enables pagination through a set of `Question`. */
  authoredQuestions: GqlQuestionsConnection;
  /** Reads and enables pagination through a set of `QuestionFollower`. */
  questionFollowers: GqlQuestionFollowersConnection;
  /** Reads and enables pagination through a set of `Answer`. */
  authoredAnswers: GqlAnswersConnection;
  /** Reads and enables pagination through a set of `QuestionComment`. */
  authoredQuestionComments: GqlQuestionCommentsConnection;
  /** Reads and enables pagination through a set of `AnswerComment`. */
  authoredAnswerComments: GqlAnswerCommentsConnection;
};


export type GqlUserAuthoredQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GqlQuestionsOrderBy>>;
  condition?: Maybe<GqlQuestionCondition>;
};


export type GqlUserQuestionFollowersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GqlQuestionFollowersOrderBy>>;
  condition?: Maybe<GqlQuestionFollowerCondition>;
};


export type GqlUserAuthoredAnswersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GqlAnswersOrderBy>>;
  condition?: Maybe<GqlAnswerCondition>;
};


export type GqlUserAuthoredQuestionCommentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GqlQuestionCommentsOrderBy>>;
  condition?: Maybe<GqlQuestionCommentCondition>;
};


export type GqlUserAuthoredAnswerCommentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GqlAnswerCommentsOrderBy>>;
  condition?: Maybe<GqlAnswerCommentCondition>;
};

/** Methods to use when ordering `Question`. */
export enum GqlQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  AuthorIdAsc = 'AUTHOR_ID_ASC',
  AuthorIdDesc = 'AUTHOR_ID_DESC',
  QuestionAsc = 'QUESTION_ASC',
  QuestionDesc = 'QUESTION_DESC',
  DetailsAsc = 'DETAILS_ASC',
  DetailsDesc = 'DETAILS_DESC',
  UpdatedDateAsc = 'UPDATED_DATE_ASC',
  UpdatedDateDesc = 'UPDATED_DATE_DESC',
  CreatedDateAsc = 'CREATED_DATE_ASC',
  CreatedDateDesc = 'CREATED_DATE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/**
 * A condition to be used against `Question` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type GqlQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `authorId` field. */
  authorId?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `question` field. */
  question?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `details` field. */
  details?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedDate` field. */
  updatedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `Question` values. */
export type GqlQuestionsConnection = {
  __typename?: 'QuestionsConnection';
  /** A list of `Question` objects. */
  nodes: Array<Maybe<GqlQuestion>>;
  /** A list of edges which contains the `Question` and cursor to aid in pagination. */
  edges: Array<GqlQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `Question` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Question` edge in the connection. */
export type GqlQuestionsEdge = {
  __typename?: 'QuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Question` at the end of the edge. */
  node?: Maybe<GqlQuestion>;
};

/** Information about pagination in a connection. */
export type GqlPageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
};

/** Methods to use when ordering `QuestionFollower`. */
export enum GqlQuestionFollowersOrderBy {
  Natural = 'NATURAL',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  QuestionIdAsc = 'QUESTION_ID_ASC',
  QuestionIdDesc = 'QUESTION_ID_DESC',
  CreatedDateAsc = 'CREATED_DATE_ASC',
  CreatedDateDesc = 'CREATED_DATE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/**
 * A condition to be used against `QuestionFollower` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type GqlQuestionFollowerCondition = {
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `questionId` field. */
  questionId?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `QuestionFollower` values. */
export type GqlQuestionFollowersConnection = {
  __typename?: 'QuestionFollowersConnection';
  /** A list of `QuestionFollower` objects. */
  nodes: Array<Maybe<GqlQuestionFollower>>;
  /** A list of edges which contains the `QuestionFollower` and cursor to aid in pagination. */
  edges: Array<GqlQuestionFollowersEdge>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `QuestionFollower` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type GqlQuestionFollower = GqlNode & {
  __typename?: 'QuestionFollower';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  userId: Scalars['BigInt'];
  questionId: Scalars['BigInt'];
  createdDate?: Maybe<Scalars['Datetime']>;
  /** Reads a single `User` that is related to this `QuestionFollower`. */
  user?: Maybe<GqlUser>;
  /** Reads a single `Question` that is related to this `QuestionFollower`. */
  question?: Maybe<GqlQuestion>;
};

/** A `QuestionFollower` edge in the connection. */
export type GqlQuestionFollowersEdge = {
  __typename?: 'QuestionFollowersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `QuestionFollower` at the end of the edge. */
  node?: Maybe<GqlQuestionFollower>;
};

/** Methods to use when ordering `QuestionComment`. */
export enum GqlQuestionCommentsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CommentAsc = 'COMMENT_ASC',
  CommentDesc = 'COMMENT_DESC',
  QuestionIdAsc = 'QUESTION_ID_ASC',
  QuestionIdDesc = 'QUESTION_ID_DESC',
  ParentIdAsc = 'PARENT_ID_ASC',
  ParentIdDesc = 'PARENT_ID_DESC',
  AuthorIdAsc = 'AUTHOR_ID_ASC',
  AuthorIdDesc = 'AUTHOR_ID_DESC',
  UpdatedDateAsc = 'UPDATED_DATE_ASC',
  UpdatedDateDesc = 'UPDATED_DATE_DESC',
  CreatedDateAsc = 'CREATED_DATE_ASC',
  CreatedDateDesc = 'CREATED_DATE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/**
 * A condition to be used against `QuestionComment` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type GqlQuestionCommentCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `comment` field. */
  comment?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `questionId` field. */
  questionId?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `parentId` field. */
  parentId?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `authorId` field. */
  authorId?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `updatedDate` field. */
  updatedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `QuestionComment` values. */
export type GqlQuestionCommentsConnection = {
  __typename?: 'QuestionCommentsConnection';
  /** A list of `QuestionComment` objects. */
  nodes: Array<Maybe<GqlQuestionComment>>;
  /** A list of edges which contains the `QuestionComment` and cursor to aid in pagination. */
  edges: Array<GqlQuestionCommentsEdge>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `QuestionComment` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** Question Comment */
export type GqlQuestionComment = GqlNode & {
  __typename?: 'QuestionComment';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  comment: Scalars['String'];
  questionId?: Maybe<Scalars['BigInt']>;
  parentId?: Maybe<Scalars['BigInt']>;
  authorId: Scalars['BigInt'];
  updatedDate?: Maybe<Scalars['Datetime']>;
  createdDate?: Maybe<Scalars['Datetime']>;
  /** Reads a single `Question` that is related to this `QuestionComment`. */
  question?: Maybe<GqlQuestion>;
  /** Reads a single `QuestionComment` that is related to this `QuestionComment`. */
  parent?: Maybe<GqlQuestionComment>;
  /** Reads a single `User` that is related to this `QuestionComment`. */
  author?: Maybe<GqlUser>;
  /** Reads and enables pagination through a set of `QuestionComment`. */
  childQuestionComments: GqlQuestionCommentsConnection;
};


/** Question Comment */
export type GqlQuestionCommentChildQuestionCommentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GqlQuestionCommentsOrderBy>>;
  condition?: Maybe<GqlQuestionCommentCondition>;
};

/** A `QuestionComment` edge in the connection. */
export type GqlQuestionCommentsEdge = {
  __typename?: 'QuestionCommentsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `QuestionComment` at the end of the edge. */
  node?: Maybe<GqlQuestionComment>;
};

/** Methods to use when ordering `AnswerComment`. */
export enum GqlAnswerCommentsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CommentAsc = 'COMMENT_ASC',
  CommentDesc = 'COMMENT_DESC',
  AnswerIdAsc = 'ANSWER_ID_ASC',
  AnswerIdDesc = 'ANSWER_ID_DESC',
  ParentIdAsc = 'PARENT_ID_ASC',
  ParentIdDesc = 'PARENT_ID_DESC',
  AuthorIdAsc = 'AUTHOR_ID_ASC',
  AuthorIdDesc = 'AUTHOR_ID_DESC',
  UpdatedDateAsc = 'UPDATED_DATE_ASC',
  UpdatedDateDesc = 'UPDATED_DATE_DESC',
  CreatedDateAsc = 'CREATED_DATE_ASC',
  CreatedDateDesc = 'CREATED_DATE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/**
 * A condition to be used against `AnswerComment` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type GqlAnswerCommentCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `comment` field. */
  comment?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `answerId` field. */
  answerId?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `parentId` field. */
  parentId?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `authorId` field. */
  authorId?: Maybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `updatedDate` field. */
  updatedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `AnswerComment` values. */
export type GqlAnswerCommentsConnection = {
  __typename?: 'AnswerCommentsConnection';
  /** A list of `AnswerComment` objects. */
  nodes: Array<Maybe<GqlAnswerComment>>;
  /** A list of edges which contains the `AnswerComment` and cursor to aid in pagination. */
  edges: Array<GqlAnswerCommentsEdge>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `AnswerComment` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** Answer Comment */
export type GqlAnswerComment = GqlNode & {
  __typename?: 'AnswerComment';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  comment: Scalars['String'];
  answerId?: Maybe<Scalars['BigInt']>;
  parentId?: Maybe<Scalars['BigInt']>;
  authorId: Scalars['BigInt'];
  updatedDate?: Maybe<Scalars['Datetime']>;
  createdDate?: Maybe<Scalars['Datetime']>;
  /** Reads a single `Answer` that is related to this `AnswerComment`. */
  answer?: Maybe<GqlAnswer>;
  /** Reads a single `AnswerComment` that is related to this `AnswerComment`. */
  parent?: Maybe<GqlAnswerComment>;
  /** Reads a single `User` that is related to this `AnswerComment`. */
  author?: Maybe<GqlUser>;
  /** Reads and enables pagination through a set of `AnswerComment`. */
  childAnswerComments: GqlAnswerCommentsConnection;
};


/** Answer Comment */
export type GqlAnswerCommentChildAnswerCommentsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GqlAnswerCommentsOrderBy>>;
  condition?: Maybe<GqlAnswerCommentCondition>;
};

/** A `AnswerComment` edge in the connection. */
export type GqlAnswerCommentsEdge = {
  __typename?: 'AnswerCommentsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `AnswerComment` at the end of the edge. */
  node?: Maybe<GqlAnswerComment>;
};

/** A `Answer` edge in the connection. */
export type GqlAnswersEdge = {
  __typename?: 'AnswersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Answer` at the end of the edge. */
  node?: Maybe<GqlAnswer>;
};

/** Methods to use when ordering `User`. */
export enum GqlUsersOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC',
  FirstNameAsc = 'FIRST_NAME_ASC',
  FirstNameDesc = 'FIRST_NAME_DESC',
  LastNameAsc = 'LAST_NAME_ASC',
  LastNameDesc = 'LAST_NAME_DESC',
  UpdatedDateAsc = 'UPDATED_DATE_ASC',
  UpdatedDateDesc = 'UPDATED_DATE_DESC',
  CreatedDateAsc = 'CREATED_DATE_ASC',
  CreatedDateDesc = 'CREATED_DATE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type GqlUserCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `email` field. */
  email?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `username` field. */
  username?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `firstName` field. */
  firstName?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `lastName` field. */
  lastName?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedDate` field. */
  updatedDate?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdDate` field. */
  createdDate?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `User` values. */
export type GqlUsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<GqlUser>>;
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<GqlUsersEdge>;
  /** Information to aid in pagination. */
  pageInfo: GqlPageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection. */
export type GqlUsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<GqlUser>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type GqlMutation = {
  __typename?: 'Mutation';
  addAnswer?: Maybe<GqlAddAnswerPayload>;
  addQuestion?: Maybe<GqlAddQuestionPayload>;
  deleteAnswer?: Maybe<GqlDeleteAnswerPayload>;
  followQuestion?: Maybe<GqlFollowQuestionPayload>;
  unfollowQuestion?: Maybe<GqlUnfollowQuestionPayload>;
  updateAnswer?: Maybe<GqlUpdateAnswerPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type GqlMutationAddAnswerArgs = {
  input: GqlAddAnswerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type GqlMutationAddQuestionArgs = {
  input: GqlAddQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type GqlMutationDeleteAnswerArgs = {
  input: GqlDeleteAnswerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type GqlMutationFollowQuestionArgs = {
  input: GqlFollowQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type GqlMutationUnfollowQuestionArgs = {
  input: GqlUnfollowQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type GqlMutationUpdateAnswerArgs = {
  input: GqlUpdateAnswerInput;
};

/** All input for the `addAnswer` mutation. */
export type GqlAddAnswerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  questionId: Scalars['BigInt'];
  answer: Scalars['JSON'];
};

/** The output of our `addAnswer` mutation. */
export type GqlAddAnswerPayload = {
  __typename?: 'AddAnswerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  answer?: Maybe<GqlAnswer>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<GqlQuery>;
  /** Reads a single `Question` that is related to this `Answer`. */
  question?: Maybe<GqlQuestion>;
  /** Reads a single `User` that is related to this `Answer`. */
  author?: Maybe<GqlUser>;
  /** An edge for our `Answer`. May be used by Relay 1. */
  answerEdge?: Maybe<GqlAnswersEdge>;
};


/** The output of our `addAnswer` mutation. */
export type GqlAddAnswerPayloadAnswerEdgeArgs = {
  orderBy?: Maybe<Array<GqlAnswersOrderBy>>;
};

/** All input for the `addQuestion` mutation. */
export type GqlAddQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  question: Scalars['String'];
  details: Scalars['String'];
};

/** The output of our `addQuestion` mutation. */
export type GqlAddQuestionPayload = {
  __typename?: 'AddQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  question?: Maybe<GqlQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<GqlQuery>;
  /** Reads a single `User` that is related to this `Question`. */
  author?: Maybe<GqlUser>;
  /** An edge for our `Question`. May be used by Relay 1. */
  questionEdge?: Maybe<GqlQuestionsEdge>;
};


/** The output of our `addQuestion` mutation. */
export type GqlAddQuestionPayloadQuestionEdgeArgs = {
  orderBy?: Maybe<Array<GqlQuestionsOrderBy>>;
};

/** All input for the `deleteAnswer` mutation. */
export type GqlDeleteAnswerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  answerId: Scalars['BigInt'];
};

/** The output of our `deleteAnswer` mutation. */
export type GqlDeleteAnswerPayload = {
  __typename?: 'DeleteAnswerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  answer?: Maybe<GqlAnswer>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<GqlQuery>;
  /** Reads a single `Question` that is related to this `Answer`. */
  question?: Maybe<GqlQuestion>;
  /** Reads a single `User` that is related to this `Answer`. */
  author?: Maybe<GqlUser>;
  /** An edge for our `Answer`. May be used by Relay 1. */
  answerEdge?: Maybe<GqlAnswersEdge>;
};


/** The output of our `deleteAnswer` mutation. */
export type GqlDeleteAnswerPayloadAnswerEdgeArgs = {
  orderBy?: Maybe<Array<GqlAnswersOrderBy>>;
};

/** All input for the `followQuestion` mutation. */
export type GqlFollowQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  questionId: Scalars['BigInt'];
};

/** The output of our `followQuestion` mutation. */
export type GqlFollowQuestionPayload = {
  __typename?: 'FollowQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  questionFollower?: Maybe<GqlQuestionFollower>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<GqlQuery>;
  /** Reads a single `User` that is related to this `QuestionFollower`. */
  user?: Maybe<GqlUser>;
  /** Reads a single `Question` that is related to this `QuestionFollower`. */
  question?: Maybe<GqlQuestion>;
  /** An edge for our `QuestionFollower`. May be used by Relay 1. */
  questionFollowerEdge?: Maybe<GqlQuestionFollowersEdge>;
};


/** The output of our `followQuestion` mutation. */
export type GqlFollowQuestionPayloadQuestionFollowerEdgeArgs = {
  orderBy?: Maybe<Array<GqlQuestionFollowersOrderBy>>;
};

/** All input for the `unfollowQuestion` mutation. */
export type GqlUnfollowQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  questionId: Scalars['BigInt'];
};

/** The output of our `unfollowQuestion` mutation. */
export type GqlUnfollowQuestionPayload = {
  __typename?: 'UnfollowQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  questionFollower?: Maybe<GqlQuestionFollower>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<GqlQuery>;
  /** Reads a single `User` that is related to this `QuestionFollower`. */
  user?: Maybe<GqlUser>;
  /** Reads a single `Question` that is related to this `QuestionFollower`. */
  question?: Maybe<GqlQuestion>;
  /** An edge for our `QuestionFollower`. May be used by Relay 1. */
  questionFollowerEdge?: Maybe<GqlQuestionFollowersEdge>;
};


/** The output of our `unfollowQuestion` mutation. */
export type GqlUnfollowQuestionPayloadQuestionFollowerEdgeArgs = {
  orderBy?: Maybe<Array<GqlQuestionFollowersOrderBy>>;
};

/** All input for the `updateAnswer` mutation. */
export type GqlUpdateAnswerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  answerId: Scalars['BigInt'];
  answer: Scalars['JSON'];
};

/** The output of our `updateAnswer` mutation. */
export type GqlUpdateAnswerPayload = {
  __typename?: 'UpdateAnswerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  answer?: Maybe<GqlAnswer>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<GqlQuery>;
  /** Reads a single `Question` that is related to this `Answer`. */
  question?: Maybe<GqlQuestion>;
  /** Reads a single `User` that is related to this `Answer`. */
  author?: Maybe<GqlUser>;
  /** An edge for our `Answer`. May be used by Relay 1. */
  answerEdge?: Maybe<GqlAnswersEdge>;
};


/** The output of our `updateAnswer` mutation. */
export type GqlUpdateAnswerPayloadAnswerEdgeArgs = {
  orderBy?: Maybe<Array<GqlAnswersOrderBy>>;
};

/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type GqlSubscription = {
  __typename?: 'Subscription';
  listen: GqlListenPayload;
};


/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type GqlSubscriptionListenArgs = {
  topic: Scalars['String'];
};

export type GqlListenPayload = {
  __typename?: 'ListenPayload';
  /** Our root query field type. Allows us to run any query from our subscription payload. */
  query?: Maybe<GqlQuery>;
  relatedNode?: Maybe<GqlNode>;
  relatedNodeId?: Maybe<Scalars['ID']>;
};

import { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": {
      "name": "Mutation"
    },
    "subscriptionType": {
      "name": "Subscription"
    },
    "types": [
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "query",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Query"
              }
            },
            "args": []
          },
          {
            "name": "nodeId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "node",
            "type": {
              "kind": "INTERFACE",
              "name": "Node"
            },
            "args": [
              {
                "name": "nodeId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "answers",
            "type": {
              "kind": "OBJECT",
              "name": "AnswersConnection"
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "condition",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "answerComments",
            "type": {
              "kind": "OBJECT",
              "name": "AnswerCommentsConnection"
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "condition",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "questions",
            "type": {
              "kind": "OBJECT",
              "name": "QuestionsConnection"
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "condition",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "questionComments",
            "type": {
              "kind": "OBJECT",
              "name": "QuestionCommentsConnection"
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "condition",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "questionFollowers",
            "type": {
              "kind": "OBJECT",
              "name": "QuestionFollowersConnection"
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "condition",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "users",
            "type": {
              "kind": "OBJECT",
              "name": "UsersConnection"
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "condition",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "answer",
            "type": {
              "kind": "OBJECT",
              "name": "Answer"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "answerComment",
            "type": {
              "kind": "OBJECT",
              "name": "AnswerComment"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "question",
            "type": {
              "kind": "OBJECT",
              "name": "Question"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "questionComment",
            "type": {
              "kind": "OBJECT",
              "name": "QuestionComment"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "questionFollower",
            "type": {
              "kind": "OBJECT",
              "name": "QuestionFollower"
            },
            "args": [
              {
                "name": "userId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "questionId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "currentUserId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "answerByNodeId",
            "type": {
              "kind": "OBJECT",
              "name": "Answer"
            },
            "args": [
              {
                "name": "nodeId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "answerCommentByNodeId",
            "type": {
              "kind": "OBJECT",
              "name": "AnswerComment"
            },
            "args": [
              {
                "name": "nodeId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "questionByNodeId",
            "type": {
              "kind": "OBJECT",
              "name": "Question"
            },
            "args": [
              {
                "name": "nodeId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "questionCommentByNodeId",
            "type": {
              "kind": "OBJECT",
              "name": "QuestionComment"
            },
            "args": [
              {
                "name": "nodeId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "questionFollowerByNodeId",
            "type": {
              "kind": "OBJECT",
              "name": "QuestionFollower"
            },
            "args": [
              {
                "name": "nodeId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "userByNodeId",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": [
              {
                "name": "nodeId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "Node",
        "fields": [
          {
            "name": "nodeId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "Query"
          },
          {
            "kind": "OBJECT",
            "name": "Answer"
          },
          {
            "kind": "OBJECT",
            "name": "Question"
          },
          {
            "kind": "OBJECT",
            "name": "User"
          },
          {
            "kind": "OBJECT",
            "name": "QuestionFollower"
          },
          {
            "kind": "OBJECT",
            "name": "QuestionComment"
          },
          {
            "kind": "OBJECT",
            "name": "AnswerComment"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AnswersConnection",
        "fields": [
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Answer"
                }
              }
            },
            "args": []
          },
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "AnswersEdge"
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": []
          },
          {
            "name": "totalCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Answer",
        "fields": [
          {
            "name": "nodeId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "answer",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "questionId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "authorId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "updatedDate",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "createdDate",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "question",
            "type": {
              "kind": "OBJECT",
              "name": "Question"
            },
            "args": []
          },
          {
            "name": "author",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": []
          },
          {
            "name": "answerComments",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AnswerCommentsConnection"
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "condition",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Question",
        "fields": [
          {
            "name": "nodeId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "authorId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "question",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "details",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedDate",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "createdDate",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "author",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": []
          },
          {
            "name": "questionFollowers",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "QuestionFollowersConnection"
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "condition",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "answers",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AnswersConnection"
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "condition",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "questionComments",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "QuestionCommentsConnection"
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "condition",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "User",
        "fields": [
          {
            "name": "nodeId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "email",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "username",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "firstName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "lastName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "updatedDate",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "createdDate",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "authoredQuestions",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "QuestionsConnection"
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "condition",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "questionFollowers",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "QuestionFollowersConnection"
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "condition",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "authoredAnswers",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AnswersConnection"
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "condition",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "authoredQuestionComments",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "QuestionCommentsConnection"
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "condition",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "authoredAnswerComments",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AnswerCommentsConnection"
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "condition",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "QuestionsConnection",
        "fields": [
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Question"
                }
              }
            },
            "args": []
          },
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "QuestionsEdge"
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": []
          },
          {
            "name": "totalCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "QuestionsEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "node",
            "type": {
              "kind": "OBJECT",
              "name": "Question"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PageInfo",
        "fields": [
          {
            "name": "hasNextPage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "hasPreviousPage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "startCursor",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "endCursor",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "QuestionFollowersConnection",
        "fields": [
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "QuestionFollower"
                }
              }
            },
            "args": []
          },
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "QuestionFollowersEdge"
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": []
          },
          {
            "name": "totalCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "QuestionFollower",
        "fields": [
          {
            "name": "nodeId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "userId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "questionId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "createdDate",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": []
          },
          {
            "name": "question",
            "type": {
              "kind": "OBJECT",
              "name": "Question"
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "QuestionFollowersEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "node",
            "type": {
              "kind": "OBJECT",
              "name": "QuestionFollower"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "QuestionCommentsConnection",
        "fields": [
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "QuestionComment"
                }
              }
            },
            "args": []
          },
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "QuestionCommentsEdge"
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": []
          },
          {
            "name": "totalCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "QuestionComment",
        "fields": [
          {
            "name": "nodeId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "comment",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "questionId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "parentId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "authorId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "updatedDate",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "createdDate",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "question",
            "type": {
              "kind": "OBJECT",
              "name": "Question"
            },
            "args": []
          },
          {
            "name": "parent",
            "type": {
              "kind": "OBJECT",
              "name": "QuestionComment"
            },
            "args": []
          },
          {
            "name": "author",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": []
          },
          {
            "name": "childQuestionComments",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "QuestionCommentsConnection"
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "condition",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "QuestionCommentsEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "node",
            "type": {
              "kind": "OBJECT",
              "name": "QuestionComment"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AnswerCommentsConnection",
        "fields": [
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "AnswerComment"
                }
              }
            },
            "args": []
          },
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "AnswerCommentsEdge"
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": []
          },
          {
            "name": "totalCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AnswerComment",
        "fields": [
          {
            "name": "nodeId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "comment",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "answerId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "parentId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "authorId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "updatedDate",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "createdDate",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "answer",
            "type": {
              "kind": "OBJECT",
              "name": "Answer"
            },
            "args": []
          },
          {
            "name": "parent",
            "type": {
              "kind": "OBJECT",
              "name": "AnswerComment"
            },
            "args": []
          },
          {
            "name": "author",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": []
          },
          {
            "name": "childAnswerComments",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AnswerCommentsConnection"
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              },
              {
                "name": "condition",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AnswerCommentsEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "node",
            "type": {
              "kind": "OBJECT",
              "name": "AnswerComment"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AnswersEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "node",
            "type": {
              "kind": "OBJECT",
              "name": "Answer"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UsersConnection",
        "fields": [
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "User"
                }
              }
            },
            "args": []
          },
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UsersEdge"
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": []
          },
          {
            "name": "totalCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UsersEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "node",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Mutation",
        "fields": [
          {
            "name": "addAnswer",
            "type": {
              "kind": "OBJECT",
              "name": "AddAnswerPayload"
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "addQuestion",
            "type": {
              "kind": "OBJECT",
              "name": "AddQuestionPayload"
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "deleteAnswer",
            "type": {
              "kind": "OBJECT",
              "name": "DeleteAnswerPayload"
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "followQuestion",
            "type": {
              "kind": "OBJECT",
              "name": "FollowQuestionPayload"
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "unfollowQuestion",
            "type": {
              "kind": "OBJECT",
              "name": "UnfollowQuestionPayload"
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "updateAnswer",
            "type": {
              "kind": "OBJECT",
              "name": "UpdateAnswerPayload"
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AddAnswerPayload",
        "fields": [
          {
            "name": "clientMutationId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "answer",
            "type": {
              "kind": "OBJECT",
              "name": "Answer"
            },
            "args": []
          },
          {
            "name": "query",
            "type": {
              "kind": "OBJECT",
              "name": "Query"
            },
            "args": []
          },
          {
            "name": "question",
            "type": {
              "kind": "OBJECT",
              "name": "Question"
            },
            "args": []
          },
          {
            "name": "author",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": []
          },
          {
            "name": "answerEdge",
            "type": {
              "kind": "OBJECT",
              "name": "AnswersEdge"
            },
            "args": [
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AddQuestionPayload",
        "fields": [
          {
            "name": "clientMutationId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "question",
            "type": {
              "kind": "OBJECT",
              "name": "Question"
            },
            "args": []
          },
          {
            "name": "query",
            "type": {
              "kind": "OBJECT",
              "name": "Query"
            },
            "args": []
          },
          {
            "name": "author",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": []
          },
          {
            "name": "questionEdge",
            "type": {
              "kind": "OBJECT",
              "name": "QuestionsEdge"
            },
            "args": [
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "DeleteAnswerPayload",
        "fields": [
          {
            "name": "clientMutationId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "answer",
            "type": {
              "kind": "OBJECT",
              "name": "Answer"
            },
            "args": []
          },
          {
            "name": "query",
            "type": {
              "kind": "OBJECT",
              "name": "Query"
            },
            "args": []
          },
          {
            "name": "question",
            "type": {
              "kind": "OBJECT",
              "name": "Question"
            },
            "args": []
          },
          {
            "name": "author",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": []
          },
          {
            "name": "answerEdge",
            "type": {
              "kind": "OBJECT",
              "name": "AnswersEdge"
            },
            "args": [
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "FollowQuestionPayload",
        "fields": [
          {
            "name": "clientMutationId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "questionFollower",
            "type": {
              "kind": "OBJECT",
              "name": "QuestionFollower"
            },
            "args": []
          },
          {
            "name": "query",
            "type": {
              "kind": "OBJECT",
              "name": "Query"
            },
            "args": []
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": []
          },
          {
            "name": "question",
            "type": {
              "kind": "OBJECT",
              "name": "Question"
            },
            "args": []
          },
          {
            "name": "questionFollowerEdge",
            "type": {
              "kind": "OBJECT",
              "name": "QuestionFollowersEdge"
            },
            "args": [
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UnfollowQuestionPayload",
        "fields": [
          {
            "name": "clientMutationId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "questionFollower",
            "type": {
              "kind": "OBJECT",
              "name": "QuestionFollower"
            },
            "args": []
          },
          {
            "name": "query",
            "type": {
              "kind": "OBJECT",
              "name": "Query"
            },
            "args": []
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": []
          },
          {
            "name": "question",
            "type": {
              "kind": "OBJECT",
              "name": "Question"
            },
            "args": []
          },
          {
            "name": "questionFollowerEdge",
            "type": {
              "kind": "OBJECT",
              "name": "QuestionFollowersEdge"
            },
            "args": [
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UpdateAnswerPayload",
        "fields": [
          {
            "name": "clientMutationId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "answer",
            "type": {
              "kind": "OBJECT",
              "name": "Answer"
            },
            "args": []
          },
          {
            "name": "query",
            "type": {
              "kind": "OBJECT",
              "name": "Query"
            },
            "args": []
          },
          {
            "name": "question",
            "type": {
              "kind": "OBJECT",
              "name": "Question"
            },
            "args": []
          },
          {
            "name": "author",
            "type": {
              "kind": "OBJECT",
              "name": "User"
            },
            "args": []
          },
          {
            "name": "answerEdge",
            "type": {
              "kind": "OBJECT",
              "name": "AnswersEdge"
            },
            "args": [
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "Any"
                    }
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Subscription",
        "fields": [
          {
            "name": "listen",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ListenPayload"
              }
            },
            "args": [
              {
                "name": "topic",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ListenPayload",
        "fields": [
          {
            "name": "query",
            "type": {
              "kind": "OBJECT",
              "name": "Query"
            },
            "args": []
          },
          {
            "name": "relatedNode",
            "type": {
              "kind": "INTERFACE",
              "name": "Node"
            },
            "args": []
          },
          {
            "name": "relatedNodeId",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "__Schema",
        "fields": [
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "types",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "__Type"
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "queryType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "__Type"
              }
            },
            "args": []
          },
          {
            "name": "mutationType",
            "type": {
              "kind": "OBJECT",
              "name": "__Type"
            },
            "args": []
          },
          {
            "name": "subscriptionType",
            "type": {
              "kind": "OBJECT",
              "name": "__Type"
            },
            "args": []
          },
          {
            "name": "directives",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "__Directive"
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "__Type",
        "fields": [
          {
            "name": "kind",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "specifiedByUrl",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "fields",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "__Field"
                }
              }
            },
            "args": [
              {
                "name": "includeDeprecated",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "interfaces",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "__Type"
                }
              }
            },
            "args": []
          },
          {
            "name": "possibleTypes",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "__Type"
                }
              }
            },
            "args": []
          },
          {
            "name": "enumValues",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "__EnumValue"
                }
              }
            },
            "args": [
              {
                "name": "includeDeprecated",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "inputFields",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "__InputValue"
                }
              }
            },
            "args": [
              {
                "name": "includeDeprecated",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "ofType",
            "type": {
              "kind": "OBJECT",
              "name": "__Type"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "__Field",
        "fields": [
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "args",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "__InputValue"
                  }
                }
              }
            },
            "args": [
              {
                "name": "includeDeprecated",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "__Type"
              }
            },
            "args": []
          },
          {
            "name": "isDeprecated",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "deprecationReason",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "__InputValue",
        "fields": [
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "__Type"
              }
            },
            "args": []
          },
          {
            "name": "defaultValue",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "isDeprecated",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "deprecationReason",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "__EnumValue",
        "fields": [
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "isDeprecated",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "deprecationReason",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "__Directive",
        "fields": [
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "isRepeatable",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "locations",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "args",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "__InputValue"
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;
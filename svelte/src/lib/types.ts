import type { OutputBlockData } from "@editorjs/editorjs";

export type Content = ContentBlock[];

export type ContentBlock = any; //TODO

export type Author = {
  id : string ;
  firstName : string
  lastName : string
}

import { it, describe, expect } from '@playwright/test';

describe.only('Question Comments', async() => {
  it('should be able to add comments to a question', async ({page}) => {

    // add top level comment
    await page.goto('http://localhost:5080/');
    await page.click('.answer-summary-1 .question-text a');
    await page.innerText('article.question-1');
    await page.click('article.question-1 .question-actions .btn-comments');
    await page.innerText('.question-1-add-comment');
    await page.innerText('.question-1-add-comment .codex-editor');
    const myComment =  `my opinion is ${Math.random()}`;
    await page.focus('.question-1-add-comment .codex-editor .ce-paragraph:first-child');
    await page.waitForTimeout(500);
    await page.fill('.question-1-add-comment .codex-editor .ce-paragraph:first-child', myComment);
    await page.waitForTimeout(500);
    await page.click('.question-1-add-comment .btn-save-reply');
    await page.waitForTimeout(500);
    const latestComment = (await page.innerText('.question-1 section.question-comments article.comment:last-of-type .comment-text p')).replace(/(\r\n|\n|\r)/gm, '');
    expect(latestComment).toEqual(myComment);


  });
});
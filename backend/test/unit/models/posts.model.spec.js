'use strict'

const { test } = use('Test/Suite')('Models/Posts')

const Post = use('App/Models/Post')

test('create a new post', async ({ assert }) => {
  const postData = {
    name: 'Meu primeiro post',
    text: 'Esse é o meu primeiro post',
    post_when: new Date()
  }

  const post = await Post.create(postData)

  assert.equal(post.name, postData.name)
})

test('post with name null', async ({ assert }) => {
  const postData = {
    name: null,
    text: 'Esse é o meu primeiro post',
    post_when: new Date()
  }

  assert.plan(1)

  try {
    await Post.create(postData)
  } catch (err) {
    assert.match(err.message, /NOT NULL constraint failed: posts.name/)
  }
})

test('post with text null', async ({ assert }) => {
  const postData = {
    name: 'Meu primeiro post',
    text: null,
    post_when: new Date()
  }

  assert.plan(1)

  try {
    await Post.create(postData)
  } catch (err) {
    assert.match(err.message, /NOT NULL constraint failed: posts.text/)
  }
})

test('post with when null', async ({ assert }) => {
  const postData = {
    name: 'Meu primeiro post',
    text: 'Esse é o meu primeiro post',
    post_when: null
  }

  const post = await Post.create(postData)

  assert.equal(post.when, postData.when)
})

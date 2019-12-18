'use strict'
const Helpers = use('Helpers')

const Post = use('App/Models/Post')
const InstagramService = use('App/Services/SocialPost/InstagramService')
const FacebookService = use('App/Services/SocialPost/FacebookService')
const TwitterService = use('App/Services/SocialPost/TwitterService')

class PostService {
  constructor(Config) {
    this.posts = []
    this.Config = Config
  }

  async formatPosts() {
    const today = new Date()

    const postsToPost = await Post.query()
      .andWhere('post_when', '<=', today)
      .orWhereNot({
        posted_instagram: null,
        instagram: false
      })
      .orWhereNot({
        posted_facebook: null,
        facebook: false
      })
      .orWhereNot({
        posted_twitter: null,
        twitter: false
      })
      .with('image')
      .fetch()

    if (!postsToPost) {
      return
    }

    const arrayPosts = postsToPost.toJSON()

    this.posts = arrayPosts.map(post => {
      const toPost = {
        id: post.id,
        instagram: post.instagram,
        facebook: post.facebook,
        twitter: post.twitter,
        image: Helpers.tmpPath(`/uploads/${post.image.path}`),
        name: post.name,
        text: post.text,
        posted_instagram: post.posted_instagram,
        posted_facebook: post.posted_facebook,
        posted_twitter: post.posted_twitter
      }
      return toPost
    })
  }

  async updatePost(id, socialMedia) {
    const post = await Post.findOrFail(id)

    switch (socialMedia) {
      case 'instagram': {
        post.merge({
          posted_instagram: new Date()
        })
        break
      }
      case 'facebook': {
        post.merge({
          posted_facebook: new Date()
        })
        break
      }
      case 'twitter': {
        post.merge({
          posted_twitter: new Date()
        })
        break
      }
    }

    await post.save()
  }

  async postInstagram() {
    const Instagram = new InstagramService(this.Config)

    await Instagram.launch()

    await Instagram.login()

    this.posts.map(async post => {
      try {
        if (post.instagram && post.posted_instagram === null) {
          await Instagram.post(post)
          await this.updatePost(post.id, 'instagram')
        }
      } catch (err) {
        console.log(err)
      }
    })

    await Instagram.close()
  }

  async postFacebook() {
    const Facebook = new FacebookService(this.Config)

    Facebook.launch()

    Facebook.login()

    this.posts.map(async post => {
      try {
        await Facebook.post(post)
        await this.updatePost(post.id, 'facebook')
      } catch (err) {
        console.log(err)
      }
    })
  }

  async postTwitter() {
    const Twitter = new TwitterService(this.Config)

    Twitter.launch()

    Twitter.login()

    this.posts.map(async post => {
      try {
        await Twitter.post(post)
        await this.updatePost(post.id, 'twitter')
      } catch (err) {
        console.log(err)
      }
    })
  }
}

module.exports = PostService

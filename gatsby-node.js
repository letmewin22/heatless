// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const storyblokEntry = path.resolve('src/templates/page.tsx')
  const storyblokCase = path.resolve('src/templates/case.tsx')
  const storyblokPost = path.resolve('src/templates/post.tsx')
  const storyblokVacature = path.resolve('src/templates/vacature.tsx')

  const getStoryEntry = async field_component => {
    try {
      return await graphql(
        `
          {
            stories: allStoryblokEntry(
              filter: { field_component: { eq: "${field_component}" } }
            ) {
              edges {
                node {
                  id
                  name
                  slug
                  field_component
                  full_slug
                  content
                  uuid
                  created_at
                  published_at
                  tag_list
                }
              }
            }
          }
        `
      )
    } catch (error) {
      throw error
    }
  }

  try {
    const result = await getStoryEntry('page')

    const entries = result.data.stories.edges

    entries.forEach(entry => {
      if (entry.slug !== 'home' && entry.slug !== 'cases') {
        const page = {
          path: `/${entry.node.full_slug.replace(/\/$/gm, '')}`,
          component: storyblokEntry,
          context: {
            story: entry.node,
          },
        }
        createPage(page)
      }
    })
  } catch (error) {
    console.log(error)
  }

  try {
    const result = await getStoryEntry('case_page')

    const entries = result.data.stories.edges

    entries.forEach(entry => {
      const page = {
        path: `/${entry.node.full_slug.replace(/\/$/gm, '')}`,
        component: storyblokCase,
        context: {
          story: entry.node,
        },
      }
      createPage(page)
    })
  } catch (error) {
    console.log(error)
  }

  try {
    const catsEntry = await getStoryEntry('case_category')
    const result = await getStoryEntry('case_main')

    const cats = catsEntry.data.stories.edges
    const entries = result.data.stories.edges

    entries.forEach(entry => {
      const path = `/${entry.node.full_slug.replace(/\/$/gm, '')}`

      cats.forEach(cat => {
        const value = cat.node.slug

        const page = {
          path: `${path}/${value.replace(/\/$/gm, '')}`,
          component: storyblokEntry,
          context: {
            story: entry.node,
          },
        }
        createPage(page)
      })

      const page = {
        path: path,
        component: storyblokEntry,
        context: {
          story: entry.node,
        },
      }
      createPage(page)
    })
  } catch (error) {
    console.log(error)
  }

  try {
    const result = await getStoryEntry('post_page')

    const entries = result.data.stories.edges

    entries.forEach(entry => {
      const page = {
        path: `/${entry.node.full_slug.replace(/\/$/gm, '')}`,
        component: storyblokPost,
        context: {
          story: entry.node,
        },
      }
      createPage(page)
    })
  } catch (error) {
    console.log(error)
  }

  try {
    const catsEntry = await getStoryEntry('post_category')
    const result = await getStoryEntry('blog_main')

    const cats = catsEntry.data.stories.edges
    const entries = result.data.stories.edges

    entries.forEach(entry => {
      const path = `/${entry.node.full_slug.replace(/\/$/gm, '')}`

      cats.forEach(cat => {
        const value = cat.node.slug

        const page = {
          path: `${path}/${value.replace(/\/$/gm, '')}`,
          component: storyblokEntry,
          context: {
            story: entry.node,
          },
        }
        createPage(page)
      })

      const page = {
        path: path,
        component: storyblokEntry,
        context: {
          story: entry.node,
        },
      }
      createPage(page)
    })
  } catch (error) {
    console.log(error)
  }

  try {
    const result = await getStoryEntry('vacature')

    const entries = result.data.stories.edges

    entries.forEach(entry => {
      const page = {
        path: `/${entry.node.full_slug.replace(/\/$/gm, '')}`,
        component: storyblokVacature,
        context: {
          story: entry.node,
        },
      }
      createPage(page)
    })
  } catch (error) {
    console.log(error)
  }
}

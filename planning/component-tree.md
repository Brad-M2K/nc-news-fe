<App>
 └── <Header>
 └── <Routes>
      ├── <ArticleList>          // for "/articles" this will be a home page basically
      │    └── <ArticleCard>
      ├── <SingleArticle>        // for "/articles/:article_id"
      │    ├── <CommentsList>
      │    │    └── <CommentCard>
      │    └── <VoteButtons>
      └── <TopicPage>            // for "/topics/:topic"

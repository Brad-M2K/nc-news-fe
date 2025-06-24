<App>
├── <Header />
├── <NavBar />
├── <Routes>
│   ├── "/" => <HomePage>
│   │        └── <ArticleCard /> (mapped list)
│   ├── "/articles/:article_id" => <ArticlePage>
│   │        ├── <CommentList />
│   │        │     └── <CommentCard /> (mapped list)
│   │        └── <CommentForm />
│   └── "/topics/:topic" => <TopicPage>
│            └── <ArticleCard /> (filtered list)
├── <ErrorPage />
└── <Footer />



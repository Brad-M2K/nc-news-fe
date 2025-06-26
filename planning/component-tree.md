<App>
├── <UserProvider>
│   └── <BrowserRouter>
│       ├── <Header />
│       ├── <NavBar />
│       ├── <Routes>
│       │   ├── "/" => <HomePage>
│       │   │         └── <ArticleCard /> (mapped list)
│       │   ├── "/articles/:article_id" => <ArticleView>
│       │   │         ├── <VoteButtons />
│       │   │         ├── <Comments>
│       │   │         │     ├── <AddComment />
│       │   │         │     └── <CommentCard /> (mapped list)
│       │   │         │           ├── <DeleteCommentButton />
│       │   │         │           └── <CancelIcon /> (as button)
│       │   │         └── <CommentForm />
│       │   └── "*" => <ErrorPage />
│       └── <Footer />



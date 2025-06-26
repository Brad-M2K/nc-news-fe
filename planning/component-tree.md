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
│       │   │         ├── <CommentList>
│       │   │         │     ├── <AddComment />
│       │   │         │     └── <CommentCard /> (mapped list)
│       │   │         │           ├── <DeleteCommentButton />
│       │   │         │           └── <CancelIcon /> (as button)
│       │   │         └── <CommentForm />
│       │   └── "*" => <ErrorPage />
│       └── <Footer />



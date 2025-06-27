<App>
├── <UserProvider>
│   └── <BrowserRouter>
│       ├── <Header />
│       ├── <FloatingNavOnHeaderHide>
│       │   └── <NavBar />
│       ├── <BackToTopButton />
│       ├── <Routes>
│       │   ├── "/" => <HomePage>
│       │   ├── "/articles/:article_id" => <ArticleView>
│       │   │         ├── <VoteButtons />
│       │   │         ├── <CommentList>
│       │   │         │     ├── <AddComment />
│       │   │         │     └── <CommentCard /> (mapped list)
│       │   │         │           ├── <DeleteCommentButton />
│       │   │         │           └── <CancelIcon /> (as button)
│       │   │         └── <CommentForm />
│       │   ├── "/topics" => <TopicPage>
│       │   │         ├── <TopicsList />
│       │   │         └── <ArticleList>
│       │   │               └── <ArticleCard /> (mapped list)
│       │   └── "*" => <ErrorPage />
│       └── <Footer />



CREATE TABLE blogs (
    id SERIAL PRIMARY KEY, 
    author TEXT, 
    url TEXT NOT NULL, 
    title TEXT NOT NULL, 
    likes INTEGER DEFAULT 0
);


INSERT INTO blogs (author, url, title) values('Edsger W. Dijkstra', 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf', 'Go To Statement Considered Harmful'), 
('Martin Fowler', 'https://martinfowler.com/articles/distributed-objects-microservices.html', 'Microservices and the First Law of Distributed Objects');

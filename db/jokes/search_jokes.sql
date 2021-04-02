SELECT * FROM silly_joke
WHERE joke_text ILIKE '%' + $1 + '%';

-- // This is the wrong code.
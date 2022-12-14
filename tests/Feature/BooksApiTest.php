<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use App\Models\Book;
use Databse\factories\BookFactory;

class BooksApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function can_get_all_books()
    {
        $books = Book::factory(4)->create();

        // $response->assertStatus(200);
        // $this->get(route('books.index'))->dump();
        $response = $this->getJson(route('books.index'));

        $response->assertJsonFragment([
            'title' => $books[0]->title
        ]);
    }

    /** @test */
    public function can_get_one_book()
    {
        $book = Book::factory()->create();

        $response = $this->getJson(route('books.show', $book));

        $response->assertJsonFragment([
            'title' => $book->title
        ]);
    }

    /** @test */
    public function can_create_books()
    {
        $this->postJson(route('books.store'), [])
            ->assertJsonValidationErrorFor('title');

        $this->postJson(route('books.store'), [
            'title' => 'My new book'
        ])->assertJsonFragment([
            'title' => 'My new book'
        ]);

        $this->assertDatabaseHas('books', [
            'title' => 'My new book'
        ]);
    }

     /** @test */
     public function can_update_books()
     {
        $book = Book::factory()->create();

        $this->pacthJson(route('books.update', $book), [])
            ->assertJsonValidationErrorFor('title');

        $this->pacthJson(route('books.update', $book), [
            'title' => 'Edited book'
        ])->assertJsonFragment([
            'title' => 'Edited book'
        ]);

        $this->assertDatabaseHas('books', [
            'title' => 'Edited book'
        ]);
     }

     public function can_delete_books()
     {
        $book = Book::factory()->create();

        $this->deleteJson(route('books.destroy', $book))
            ->assertNoContent();

        $this->assertDatabaseCount('books', 0);
     }
}

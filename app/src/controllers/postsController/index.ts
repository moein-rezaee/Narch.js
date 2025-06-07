import { RouterDecorator } from 'narch/src/decorators/routerDecorator';
const { Put, Post, Delete, Get, Route } = RouterDecorator;
import { PostService } from '../../services/postService'; // Import the service

@Route("[controller]") // Simplified route, actions will be added by method decorators
class PostsController { // Changed class name to PascalCase (convention)
  private postService: PostService;

  constructor() {
    // Dependency Injection is preferred here.
    // For now, direct instantiation for simplicity.
    this.postService = new PostService();
  }

  // GET: /posts/:id
  @Get(":id") // Define route parameter for GET by id
  async get(id: string): Promise<string | object> { // Return type changed for consistency
    const post = await this.postService.getPostById(id);
    if (post) {
      return post;
    }
    // In a real app, you'd return a proper HTTP status code like 404
    // For now, returning a JSON object for not found
    // Narch might have a specific way to handle HTTP responses and status codes
    return { message: "Post not found" };
  }

  // GET: /posts
  @Get() // No specific path, maps to /posts
  async getAll(): Promise<any[]> {
    return await this.postService.getAllPosts();
  }

  // POST: /posts
  @Post()
  async add(data: any): Promise<any> {
    // In a real app, 'data' would likely be a typed DTO (Data Transfer Object)
    // and validated before being passed to the service.
    // Also, need to confirm how 'data' is populated from the request body by Narch.
    return await this.postService.addPost(data);
  }

  // PUT: /posts/:id
  @Put(":id") // Define route parameter for PUT
  async edit(id: string, data: any): Promise<any | object> {
    // Similar to add, data should be a DTO and validated.
    // 'id' from route, 'data' from body.
    // Narch's parameter binding mechanism needs to be understood for robust implementation.
    const updatedPost = await this.postService.editPost(id, data);
    if (updatedPost) {
      return updatedPost;
    }
    return { message: "Post not found for update" };
  }

  // DELETE: /posts/:id
  @Delete(":id") // Define route parameter for DELETE
  async delete(id: string): Promise<object> { // Return type changed for consistency
    const success = await this.postService.deletePost(id);
    if (success) {
      return { message: `Post with id ${id} deleted successfully` };
    }
    return { message: "Post not found or could not be deleted" };
  }
}

module.exports = PostsController; // Exporting PascalCase name

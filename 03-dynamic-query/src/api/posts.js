

export async function fetchPost(postId){

    const response=await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);

    if(!response.ok){
        throw new Error("Failed to fetch posts")
    }

    return response.json();
}
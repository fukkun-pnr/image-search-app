declare namespace App {

    type FavoriteInputData = {
        title: string;
        description: string;
    }

    type FavoriteChoiceData = {
        favoriteId: string;
    }

    type Favorite = {
        id?: string;
        photos: Unsplash.Photo[];
    } & FavoriteInputData;

    type FavoriteCollection = Favorite[];
}

declare namespace Unsplash {
    type SearchRandomRequest = {
        query: string;
    };

    type SearchRandomResponse = Photo;

    type PhotoUrlsIndex = "raw" | "full" | "regular" | "small" | "thumb";

    type PhotoUrls = {
        [key in PhotoUrlsIndex]: string;
    }

    type PhotoLinksIndex = "self" | "html" | "download" | "download_location";

    type PhotoLinks = {
        [key in PhotoLinksIndex]: string;
    }

    type UserUrlIndex = "self" | "html" | "photos" | "likes" | "portfolio";

    type UserUrls = {
        [key in UserUrlIndex]: string;
    }

    type ProfileImageIndex = "small" | "medium" | "large";

    type ProfileImages = {
        [key in ProfileImageIndex]: string;
    }

    type Photo = {
        id: string;
        created_at: string;
        width: number;
        height: number;
        color: string;
        blur_hash: string;
        likes: number;
        liked_by_user: boolean;
        description: string;
        user: User;
        current_user_collections: string[];
        urls: PhotoUrls;
        links: PhotoLinks;
    }

    type User = {
        id: string;
        username: string;
        name: string;
        portfolio_url: string;
        bio: string;
        location: string;
        total_likes: number;
        total_photos: number;
        total_collections: number;
        instagram_username: string;
        twitter_username: string;
        profile_image: ProfileImages;
        links: UserUrls;
    }
}
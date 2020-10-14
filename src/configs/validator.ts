export const favoriteRule = {
    title: {
        required: "title is required",
        minLength: {
            value: 2,
            message: "Please title enter at least 2 characters",
        },
        maxLength: {
            value: 30,
            message: "Please title enter within 30 characters",
        }
    },
    description: {
        required: "description is required",
        minLength: {
            value: 2,
            message: "Please enter at least 2 characters",
        },
        maxLength: {
            value: 128,
            message: "Please enter within 128 characters",
        }
    }
}
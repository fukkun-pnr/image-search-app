import React from "react";
import { useForm } from "react-hook-form";
import { favoriteRule } from "app/src/configs/validator";

type Props = {
    onSubmit: (data: App.FavoriteInputData) => void;
};

export const FavoriteAddForm: React.FC<Props> = (props: Props) => {
    const { register, handleSubmit, errors } = useForm<App.FavoriteInputData>();

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" ref={register(favoriteRule.title)} />
            {errors.title && <span role="alert" className="error">{errors.title.message}</span>}
            <label htmlFor="description">Description</label>
            <input type="text" name="description" ref={register(favoriteRule.description)} />
            {errors.description && <span role="alert" className="error">{errors.description.message}</span>}
            <input type="submit" value="Add" />
        </form>
    );
};
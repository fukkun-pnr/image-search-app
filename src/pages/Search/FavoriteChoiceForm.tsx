import React from "react";
import { useForm } from "react-hook-form";

type Props = {
    favorites: App.FavoriteCollection;
    onSubmit: (data: App.FavoriteChoiceData) => void;
};

export const FavoriteChoiceForm: React.FC<Props> = React.memo((props: Props) => {
    const { register, handleSubmit } = useForm<App.FavoriteChoiceData>();

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <select name="favoriteId" ref={register}>
                {props.favorites.map((favorite, idx) => <option key={idx} value={favorite.id}>{favorite.title}</option>)}
            </select>
            <input type="submit" value="Add" />
        </form>
    );
});
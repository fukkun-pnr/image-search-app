import React from "react";
import { useForm } from "react-hook-form";
import { favoriteRule } from "app/src/configs/validator";

type Props = {
    favorite: App.Favorite;
    onSubmit: (data: App.FavoriteInputData) => void;
};

export const FavoriteEditInfoForm: React.FC<Props> = React.memo((props: Props) => {
    const { register, handleSubmit } = useForm<App.FavoriteInputData>();

    return (
        <div className="favorite-edit-info-form">
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <input type="text" name="title" defaultValue={props.favorite.title} ref={register(favoriteRule.title)} />
                <input type="text" name="description" defaultValue={props.favorite.description} ref={register(favoriteRule.description)} />
                <input type="submit" value="Save" />
            </form>
        </div>
    );
});
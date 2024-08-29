
export type DjangoRelation = {
    is_relation: boolean;
    model?: {
        model_name: string;
        app_label: string;
    }
}


export interface IMedaille {
    id_medaille: number;
    nom: string;
    description: string;
    image: string;
    legendaire: boolean;
    unlock: boolean;
}

export interface IMedailleProps {
    medaille: IMedaille;
    canSelect?: boolean;
    onSelect?: any;
    selected?: boolean;
}

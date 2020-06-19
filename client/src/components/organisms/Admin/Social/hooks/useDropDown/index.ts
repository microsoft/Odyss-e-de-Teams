import { useEffect, useState } from "react";
import AdminApi from "api/Admin";

export interface IAsset {
  id_asset_communication: number;
  id_social_asset_communication: number;
  nom_social: string;
  nom: string;
  nom_fichier: string;
  contenu1: string;
  contenu2: string;
}

export interface IUseDropDownOutput {
  items: IGroupedIAsset[];
  selected: IGroupedIAsset;
  bannerPath: string;
  changeSelection: (asset: IGroupedIAsset) => void;
}

export class IGroupedIAsset {
  public id: number;
  public name: string;
  /**
   * A array for potential future purpose
   */
  public items: IAsset[] = [];

  constructor(data: IAsset) {
    this.id = data.id_social_asset_communication;
    this.name = data.nom_social;
    this.items.push(data);
  }
}

const loadAssets = async (): Promise<IGroupedIAsset[]> => {
  const list: IAsset[] = await AdminApi.getListAsset(2);
  const socialMapping: Map<number, IGroupedIAsset> = new Map();
  list.forEach((as) => {
    if (!socialMapping.has(as.id_asset_communication))
      socialMapping.set(
        as.id_social_asset_communication,
        new IGroupedIAsset(as)
      );
    else socialMapping.get(as.id_social_asset_communication).items.push(as);
  });
  return [...socialMapping].map((x) => x[1]);
};

const useDropDown = (): IUseDropDownOutput => {
  // STATE
  const [items, setItems] = useState<IGroupedIAsset[]>([]);
  const [selected, changeSelection] = useState<IGroupedIAsset>();
  const [bannerPath, setBannerPath] = useState<string>();

  // LOAD ON INIT
  useEffect(() => {
    loadAssets().then((data: IGroupedIAsset[]) => {
      setItems(data);
      changeSelection(data[0]);
    });
  }, []);

  // IMAGE SOURCE CHANGE
  useEffect(() => {
    if (selected) {
      const basePath = process.env.REACT_APP_STATIC_URL + "/images/social/";

      // CURRENTLY USSING THE FIRST ITEM
      const src = basePath + selected.items[0].nom_fichier;
      setBannerPath(src);
    }
  }, [selected]);

  return {
    items,
    selected,
    bannerPath,
    changeSelection,
  };
};

export default useDropDown;

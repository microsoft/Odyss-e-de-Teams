// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { useEffect, useState } from "react";
import Admin from "api/Admin";
import i18n from '../../../../../../../../config/i18n';

export interface IThemesAsset {
  id_thematique: number;
  nom: string;
  activated: boolean;
}

export interface IUseThemesOutput {
  items: IThemesAsset[];
  toggle: (item: IThemesAsset) => void;
  reset: () => void;
  save: () => Promise<boolean> | boolean;
}

const fetchThemes = (): Promise<IThemesAsset[]> => Admin.getThemes(i18n.language);

const mutateItems = (
  changed: Set<IThemesAsset>,
  disabled: Set<IThemesAsset>,
  item: IThemesAsset,
  maxAllowed: number
) => {
  if (changed.has(item)) changed.delete(item);
  else changed.add(item);
  if (disabled.has(item)) disabled.delete(item);
  else disabled.add(item);
  item.activated = !item.activated;
  if (disabled.size > maxAllowed) {
    const first: IThemesAsset = disabled.values().next().value;
    mutateItems(changed, disabled, first, maxAllowed);
  }
};

const useThemes = (): IUseThemesOutput => {
  // STATE
  const [items, setItems] = useState<IThemesAsset[]>([]);
  const [changed] = useState<Set<IThemesAsset>>(new Set());
  const [disabled] = useState<Set<IThemesAsset>>(new Set());
  const maxAllowed = 1;

  // ON LOAD
  useEffect(() => {
    fetchThemes().then((result) => {
      result.forEach((item) => {
        if (!item.activated) {
          disabled.add(item);
        }
      });

      setItems(result);
    });
  }, []);

  // SWITCH HANLDER
  const toggle = (item: IThemesAsset): void => {
    mutateItems(changed, disabled, item, maxAllowed);
    setItems([...items]);
  };

  // CANCEL HANDLER
  const reset = (): void => {
    if (changed.size) {
      disabled.clear();
      changed.forEach((item) => {
        item.activated = !item.activated;
      });
      items.forEach((item) => {
        if (!item.activated) disabled.add(item);
      });
      changed.clear();
      setItems([...items]);
    }
  };

  // SAVE HANDLER
  const save = (): Promise<boolean> | boolean => {
    if (!changed.size) return true;

    const toBeActivated = [];
    const toBeDeactivated = [];

    changed.forEach((item) => {
      if (item.activated) toBeActivated.push(item.id_thematique);
      else toBeDeactivated.push(item.id_thematique);
    });
    const queue: Promise<boolean>[] = [];

    if (toBeActivated.length) queue.push(Admin.activateThemes(toBeActivated));
    if (toBeDeactivated.length)
      queue.push(Admin.deactivateThemes(toBeDeactivated));

    return Promise.all(queue)
      .then(() => true)
      .catch(() => false);
  };

  return {
    items,
    toggle,
    reset,
    save,
  };
};

export default useThemes;

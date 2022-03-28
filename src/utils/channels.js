export const ChannelsUtils = {
  getChannelWithCategoryByIdChannel(id) {
    try {
      let localChannels = localStorage.getItem("@channels");
      localChannels = JSON.parse(localChannels);

      const result = localChannels.groups.filter((v) => {
        const res = v.channels.filter((c) => c.id === id);
        if (res.length > 0) {
          v.channels = res;
        }
        return res.length > 0;
      });

      return result.length > 0 ? result[0] : null;
    } catch (e) {
      return null;
    }
  },
  getChannelsCategoriesNames() {
    try {
      let localChannels = localStorage.getItem("@channels");
      localChannels = JSON.parse(localChannels);
      return localChannels.groups.map(v => v.name);
    } catch (e) {
      return null;
    }},
    getChannelsCategoriesNamesForSelect() {
      try {
        let localChannels = localStorage.getItem("@channels");
        localChannels = JSON.parse(localChannels);
        return localChannels.groups.map(v => {return {value: v.name, label: v.name}});
      } catch (e) {
        return null;
      }
  },
  getChannelsByCategoriesSelect(categoriesSelect) {
    try {
      let localChannels = localStorage.getItem("@channels");
      localChannels = JSON.parse(localChannels);
      let channels = [];
      if (Array.isArray(categoriesSelect))
      {
        for (const category of categoriesSelect) {
          channels = [...channels, ...(localChannels.groups.filter(v => v.name === category.value))[0].channels];
        }
      }
      else {
        channels = [...channels, ...(localChannels.groups.filter(v => v.name === categoriesSelect.value))[0].channels];
      }

      return channels;
    } catch (e) {
      return null;
    }
  }
};

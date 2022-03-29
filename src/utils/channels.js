export const ChannelsUtils = {
  getChannelWithCategoryByIdChannel(id) {
    try {
      let localChannels = localStorage.getItem("@channels");
      localChannels = JSON.parse(localChannels);

      for (const group of localChannels) {
        for (const channel of group.channels) {
          if (channel.id === id) {
            group.channels = [channel];
            return group;
          }
        }
      }

    } catch (e) {
      return null;
    }
  },
  getChannelsCategoriesNames() {
    try {
      let localChannels = localStorage.getItem("@channels");
      localChannels = JSON.parse(localChannels);
      return localChannels.map(v => v.name);
    } catch (e) {
      return null;
    }
  },
  getChannelsCategoriesNamesForSelect() {
    try {
      let localChannels = localStorage.getItem("@channels");
      localChannels = JSON.parse(localChannels);
      return localChannels.map(v => {
        return { value: v.name, label: v.name };
      });
    } catch (e) {
      return null;
    }
  },
  getChannelsByCategoriesSelect(categoriesSelect) {
    try {
      let localChannels = localStorage.getItem("@channels");
      localChannels = JSON.parse(localChannels);
      let channels = [];
      if (Array.isArray(categoriesSelect)) {
        for (const category of categoriesSelect) {
          channels = [...channels, ...(localChannels.filter(v => v.name === category.value))[0].channels];
        }
      } else {
        channels = [...channels, ...(localChannels.filter(v => v.name === categoriesSelect.value))[0].channels];
      }

      return channels;
    } catch (e) {
      return null;
    }
  }
};

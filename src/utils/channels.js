export const ChannelsUtils = {
  getChannelById(channelsGroups, id) {
    try {
      for (const group of channelsGroups) {
        for (const channel of group.channels) {
          if (channel.id === id) {
            return { ...channel };
          }
        }
      }
    } catch (e) {
      return null;
    }
  },
  getChannelsCategoriesNamesForSelect(channelsGroups) {
    try {
      return channelsGroups.map(v => {
        return { value: v.name, label: v.name };
      });
    } catch (e) {
      return null;
    }
  },
  getChannelsByCategoriesSelect(channelsGroups, categoriesSelect) {
    try {
      let channels = [];
      if (Array.isArray(categoriesSelect)) {
        for (const category of categoriesSelect) {
          channels = [...channels, ...(channelsGroups.filter(v => v.name === category.value))[0].channels];
        }
      } else {
        channels = [...channels, ...(channelsGroups.filter(v => v.name === categoriesSelect.value))[0].channels];
      }
      return channels;
    } catch (e) {
      return null;
    }
  },
  getChannelsCategoriesNames(channelsGroups) {
    try {
      return channelsGroups.map(v => v.name);
    } catch (e) {
      return null;
    }
  },
  getNearestTimeProgramme(programmes, time, thisTime) {
    if (programmes) {
      for (let i = 0; i < programmes.length; i++) {
        if (programmes[i].ut_start > time) {
          return i > 0 ? programmes[i - 1].ut_start : programmes[i].ut_start;
        }
      }
    }
    return null;
  },
  getNearestIntervalTimeProgramme(programmes, time, thisTime) {
    if (programmes) {
      for (let i = 0; i < programmes.length; i++) {
        if (programmes[i].ut_start > time) {
          return i > 0 ? {
            start: programmes[i - 1].ut_start,
            end: programmes[i].ut_start,
            time: thisTime
          } : { start: programmes[i].ut_start, end: programmes[i + 1].ut_start, time: thisTime };
        }
      }
    }
    return null;
  },
  getChannelWithCategoryByIdChannelFromLocal(id) {
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
  getChannelsCategoriesNamesFromLocal() {
    try {
      let localChannels = localStorage.getItem("@channels");
      localChannels = JSON.parse(localChannels);
      return localChannels.map(v => v.name);
    } catch (e) {
      return null;
    }
  },
  getChannelsCategoriesNamesForSelectFromLocal() {
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
  getChannelsByCategoriesSelectFromLocal(categoriesSelect) {
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

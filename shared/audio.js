(function () {
  "use strict";

  window.createAudioBus = function createAudioBus(options = {}) {
    const state = {
      ctx: null,
      master: null,
      volume: options.volume ?? 1,
      enabled: options.enabled !== false
    };

    function ensure() {
      if (!state.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        state.ctx = new AC();
        state.master = state.ctx.createGain();
        state.master.connect(state.ctx.destination);
      }
      if (state.ctx.state === "suspended") state.ctx.resume();
      state.master.gain.value = state.enabled ? state.volume : 0;
      return state;
    }

    return {
      ensure,
      setEnabled(enabled) {
        state.enabled = Boolean(enabled);
        if (state.master) state.master.gain.value = state.enabled ? state.volume : 0;
      },
      setVolume(volume) {
        state.volume = Math.max(0, Math.min(1, Number(volume) || 0));
        if (state.master) state.master.gain.value = state.enabled ? state.volume : 0;
      },
      get context() { return state.ctx; },
      get master() { return state.master; }
    };
  };
}());

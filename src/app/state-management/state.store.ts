import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
import { StateModel } from "./state.model.type"
import { computed } from "@angular/core"

type State = {
    item: StateModel
}

const initialState: State = {
    item: {
        pedidosList: [],
        total: 0,
    }
}

export const PedidosStore = signalStore(
  { providedIn: 'root'},
  withState(initialState),
  withComputed(({ item }) => ({
    pedidos: computed(() => item.pedidosList()),
    totalPedido: computed(() => item.total())
  })),
  withMethods(store => ({
    addPedido(pedidoList: any){
        patchState(store, {
            item: {
                ...store.item(),
                pedidosList: pedidoList
            }
        })
    },
    addTotal(total: number){
      patchState(store, {
          item: {
              ...store.item(),
              total: total,
          }
      })
  },
    resetPedido(){
      patchState(store, {
        item: {
            pedidosList: [],
            total: 0
        }
    })
    }
    
  }))
);
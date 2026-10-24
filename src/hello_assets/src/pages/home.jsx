import * as React from "react";
import PlugConnect from "../components/PlugConnect";
import "../../assets/main.css";

const Home = (props) => {
  return (
    <div id="body">
      <h2 className="title">Welcome</h2>
      {props.loggedIn ? (
        !props.loading ? (
          <>
            <button className="myButton specialButton" onClick={props.mint}>
              Mint NFT - 100 tokens
            </button>
            <br></br>
            {props.hasNft ? (
              <button
                className="myButton specialButton"
                onClick={() => props.setRoute("game")}
              >
                Play Game
              </button>
            ) : (
              <></>
            )}
          </>
        ) : (
          <p className="whiteText">loading...</p>
        )
      ) : (
        <PlugConnect
          whitelist={props.whitelist}
          onConnectCallback={async () => {
            props.setLoggedIn(true);
            const principal = await window.ic.plug.agent.getPrincipal();
            props.setPrincipal(principal.toText());
          }}
        />
      )}
    </div>
  );
};

export default Home;

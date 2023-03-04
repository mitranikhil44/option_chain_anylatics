import React from "react";

const About = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-purple-200 to-indigo-400 text-black p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
        <p className="text-lg mb-6 text-center leading-7">
          Option Chain Analytics is a data-driven platform dedicated to
          providing real-time data for the Indian stock market. Our mission is
          to empower traders and short term investors with the information they need to
          make informed decisions and achieve their financial goals.
        </p>
        <p className="text-lg mb-6 text-center leading-7">
          Our website offers a comprehensive view of the Nifty 50, Bank Nifty &
          Fin Nifty option chains, including current open interest, change in
          open interest and current volume. Our data is
          updated every 5 minutes, ensuring that our users always have access to
          the latest information. From market opening to market close, our
          website constantly fetches and sets new data, providing a reliable
          source for stock market enthusiasts and traders.
        </p>
        <p className="text-lg mb-6 text-center leading-7">
          We also provide valuable insights and analysis on market trends,
          volatility, and option strategies. Our team of experienced analysts
          and data scientists use advanced algorithms and machine learning
          techniques to identify patterns and generate actionable
          recommendations.
        </p>
        <p className="text-lg mb-6 text-center leading-7">
          Whether you're a beginner or an experienced trader, we believe in the
          power of information and strive to make stock market data accessible
          to everyone. Join our community today and start making smarter
          investment decisions.
        </p>
        <div className="mt-12 flex justify-center">
          <a
            href="/signup"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full"
          >
            Sign up now
          </a>
        </div>
      </div>
    </>
  );
};

export default About;
